import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/blogs";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

// Constants
const dbCollectionName = "blogs";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/blogs`;

/**
 * Filter blogs based on various criteria.
 * @param {FilterBlogsSchema} requestData - Request Data
 * @returns {Promise} Response: [ListResponseBlogSchema, ResponseIndicator.SUCCESS]
 */
export async function filterBlogsApi(
  requestData: schemas.FilterBlogsSchema
): Promise<
  [Error | schemas.ListResponseBlogsSchema | string, ResponseIndicatorValues]
> {
  try {
    let q = buildFirestoreQuery(requestData, dbCollection);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [
        {
          data: [],
          recordsCount: 0,
          message: "No records returned",
        } as schemas.ListResponseBlogsSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.BlogSchema[] = [];
      querySnapshot.forEach((doc) => {
        response.push({
          id: doc.id,
          ...doc.data(),
          updatedAt:
            doc.data().updatedAt instanceof Timestamp
              ? doc.data().updatedAt.toDate()
              : doc.data().updatedAt,
          createdAt:
            doc.data().createdAt instanceof Timestamp
              ? doc.data().createdAt.toDate()
              : doc.data().createdAt,
        } as schemas.BlogSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "blogs fetched",
        } as schemas.ListResponseBlogsSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Create a new blog.
 * @param {CreateblogWithFileSchema} requestData - Request Data to create an blog.
 * @returns {Promise} Response: [ResponseBlogSchema, ResponseIndicator.SUCCESS]
 */
export async function createBlogApi(
  requestData: schemas.CreateBlogWithFileSchema
): Promise<
  [Error | schemas.ResponseBlogSchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = "";
    let id = uuidv4();
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id,
        folderPath: storageFilePath,
      }); // Upload image if provided
    }

    const newData: Omit<schemas.BlogSchema, "id" | "createdAt" | "updatedAt"> =
      {
        ...requestData.data,
        imgUrl: imgUrl || (requestData.data.imgUrl ?? null),
      };

    const response = await runTransaction(db, async (transaction) => {
      // get stats doc
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const newDocRef = doc(db, dbCollectionName, id);
      const newDocData = {
        ...newData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // create new doc
      transaction.set(newDocRef, newDocData);

      // increase aggregator
      transaction.update(dbInfoAggregatorRef, {
        blogs: dbInfoAggregatorDoc.data().blogs + 1,
      });

      // Update sitemap document (push new ID to list)
      transaction.update(dbInfoSitemapRef, {
        blogIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New blog created successfully",
      } as schemas.ResponseBlogSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Update an existing blog.
 * @param {UpdateBlogWithFileSchema} requestData - Request Data to update a blog.
 * @returns {Promise} Response: [ResponseBlogSchema, ResponseIndicator.SUCCESS]
 */
export async function updateBlogApi(
  requestData: schemas.UpdateBlogWithFileSchema
): Promise<
  [Error | schemas.ResponseBlogSchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = requestData.data.imgUrl || "";
    let id = requestData.id;

    // If a new file is provided, upload it and get the new image URL
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id, // Use the existing member ID for the fileID
        folderPath: storageFilePath,
      });
    }

    // Prepare the updated member data
    const updatedData: Omit<
      schemas.UpdateBlogSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl,
    };

    const response = await runTransaction(db, async (transaction) => {
      // get member doc
      const memberDocRef = doc(db, dbCollectionName, id);

      // update member data
      const updatedDocData = {
        ...updatedData,
        updatedAt: new Date(), // Keep createdAt unchanged
      };

      transaction.update(memberDocRef, updatedDocData);
      return updatedDocData;
    });

    return [
      {
        data: response,
        message: "Blog updated successfully",
      } as schemas.ResponseBlogSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a blog by ID.
 * @param {string} id - ID.
 * @returns {Promise} Response: [ResponseBlogSchema, ResponseIndicator.SUCCESS]
 */
export async function getBlogApi(
  id: string
): Promise<
  [Error | schemas.ResponseBlogSchema | string, ResponseIndicatorValues]
> {
  try {
    const docRef = doc(db, dbCollectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return [
        {
          data: {
            id: docSnap.id,
            ...docSnap.data(),
            updatedAt:
              docSnap.data().updatedAt instanceof Timestamp
                ? docSnap.data().updatedAt.toDate()
                : docSnap.data().updatedAt,
            createdAt:
              docSnap.data().createdAt instanceof Timestamp
                ? docSnap.data().createdAt.toDate()
                : docSnap.data().createdAt,
          },
          message: "Blog fetched successfully",
        } as schemas.ResponseBlogSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such data found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Delete a blog by ID
 * @param {BlogSchema} data - Data of the blog
 * @returns {Promise} Response: [ResponseCustomerSchema, ResponseIndicator.SUCCESS]
 */
export async function deleteBlogApi(
  data: schemas.BlogSchema
): Promise<
  [Error | schemas.ResponseBlogSchema | string, ResponseIndicatorValues]
> {
  try {
    const response = await runTransaction(db, async (transaction) => {
      // get stats doc
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const docRef = doc(db, dbCollectionName, data.id);

      // If the member has an image, delete it from Firebase Storage
      if (data.imgUrl) {
        await deleteFile({ objectUrl: data.imgUrl });
      }

      // create new doc
      transaction.delete(docRef);

      // increase aggregator
      transaction.update(dbInfoAggregatorRef, {
        blogs: dbInfoAggregatorDoc.data().blogs - 1,
      });

      // Update sitemap document (push new ID to list)
      transaction.update(dbInfoSitemapRef, {
        blogIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Blog deleted successfully.",
      } as schemas.ResponseBlogSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
