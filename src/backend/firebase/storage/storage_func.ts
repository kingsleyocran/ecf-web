import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../firebaseClient";

// Upload image to Firebase Storage
export async function uploadFile({
  file,
  fileID = uuidv4(),
  folderPath,
}: {
  file: File;
  fileID?: string;
  folderPath: string;
}): Promise<string> {
  const storageRef = ref(storage, `${folderPath}/${fileID}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

// delete image from firebase
export async function deleteFile({ objectUrl }: { objectUrl: string }) {
  const imageRef = ref(storage, objectUrl);
  await deleteObject(imageRef).catch((error) => {
    console.warn("Error deleting image:", error);
  });
}

// Convert base64 string to Blob
function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

// Extract Firebase Storage URLs from HTML content
export function extractFirebaseStorageUrls(htmlContent: string): string[] {
  if (!htmlContent) return [];

  // Regex to match Firebase Storage URLs in img tags (handles both single and double quotes)
  const firebaseUrlRegex =
    /<img[^>]+src=["'](https:\/\/firebasestorage\.googleapis\.com[^"']+)["'][^>]*>/g;
  const urls: string[] = [];
  const matches = Array.from(htmlContent.matchAll(firebaseUrlRegex));

  for (const match of matches) {
    // Decode HTML entities (e.g., &amp; -> &) to ensure accurate comparison
    const url = match[1].replace(/&amp;/g, "&");
    urls.push(url);
  }

  return urls;
}

// Process HTML content to replace base64 images with Firebase Storage URLs
export async function processContentImages(
  htmlContent: string
): Promise<string> {
  if (!htmlContent) return htmlContent;

  // Regex to match base64 images in img tags
  const base64ImageRegex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>/g;

  let processedContent = htmlContent;
  const matches = Array.from(htmlContent.matchAll(base64ImageRegex));

  // Process each base64 image
  for (const match of matches) {
    try {
      const fullImgTag = match[0];
      const imageType = match[1]; // e.g., 'png', 'jpeg', 'jpg'
      const base64Data = match[2];

      // Convert base64 to Blob
      const blob = base64ToBlob(base64Data, `image/${imageType}`);

      // Create a File object from the Blob
      const fileName = `${uuidv4()}.${imageType}`;
      const file = new File([blob], fileName, { type: `image/${imageType}` });

      // Upload to Firebase Storage
      const downloadURL = await uploadFile({
        file: file,
        fileID: uuidv4(),
        folderPath: "blogs/content-images",
      });

      // Replace the base64 src with the Firebase Storage URL
      const newImgTag = fullImgTag.replace(
        /src="data:image\/[^;]+;base64,[^"]+"/,
        `src="${downloadURL}"`
      );

      processedContent = processedContent.replace(fullImgTag, newImgTag);
    } catch (error) {
      console.error("Error processing image:", error);
      // Continue with next image if one fails
    }
  }

  return processedContent;
}

// Clean up removed images from Firebase Storage
export async function cleanupRemovedImages(
  oldContent: string,
  newContent: string
): Promise<void> {
  if (!oldContent) return;

  // Extract URLs from both old and new content
  const oldUrls = extractFirebaseStorageUrls(oldContent);
  const newUrls = extractFirebaseStorageUrls(newContent);

  // Find URLs that exist in old but not in new (these are removed images)
  const removedUrls = oldUrls.filter((url) => !newUrls.includes(url));

  // Only delete images from the blogs/content-images folder to avoid deleting cover images
  const contentImageUrls = removedUrls.filter((url) =>
    url.includes("blogs%2Fcontent-images")
  );

  // Delete each removed image
  for (const url of contentImageUrls) {
    try {
      await deleteFile({ objectUrl: url });
      console.log("Deleted removed image:", url);
    } catch (error) {
      console.error("Error deleting removed image:", url, error);
      // Continue with next image if one fails
    }
  }
}
