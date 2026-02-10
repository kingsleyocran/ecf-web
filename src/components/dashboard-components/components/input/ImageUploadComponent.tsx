import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import NextImage from "next/image";
import AttachIcon from "../../../../../public/assets/dashboard_assets/attach.svg";
import ImageIcon from "../../../../../public/assets/dashboard_assets/image.svg";
import DeleteIcon from "../../../../../public/assets/dashboard_assets/delete.svg";
import CheckIcon from "../../../../../public/assets/dashboard_assets/check_input.svg";
import ErrorIcon from "../../../../../public/assets/dashboard_assets/error_input.svg";

interface ImageUploadComponentProps {
  maxFileSize: number; // Max file size in bytes
  maxOutputSize: number; // Max output image size in bytes
  onImageUpload: (file: File | null) => void;
  labelText: string;
  isRequired?: boolean;
  placeholderText?: string; // Optional placeholder text
  initImgUrl?: string;
  isCircular?: boolean;
  sizeHW?: string;
}

export interface ImageUploadComponentRef {
  resetState: () => void;
}

const ImageUploadComponent = forwardRef<
  ImageUploadComponentRef,
  ImageUploadComponentProps
>(function (
  {
    maxFileSize,
    maxOutputSize,
    onImageUpload,
    labelText,
    isRequired = true,
    placeholderText = "Attach file (PNG/JPG, size below 5MB)",
    initImgUrl,
    isCircular = true,
    sizeHW = "h-200 w-200",
  },
  ref
) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const filePickerRef = useRef<any>(null);

  const [isValidBool, setIsValidBool] = useState<"valid" | "invalid" | "empty">(
    "empty"
  );

  const addImageToForm = (event: any) => {
    const file = event.target.files[0];

    // Check if file exceeds the size limit
    if (file.size > maxFileSize) {
      setErrorMessage("File size exceeds 5 MB. Please upload a smaller file.");
      setSelectedFile(null);
      setIsValidBool(isRequired ? "invalid" : "empty");

      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent: any) => {
      const img = new Image();
      img.src = readerEvent.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        // Check if resizing is needed (file size > 800KB)
        const resizeThreshold = 800 * 1024; // 800KB in bytes
        if (file.size <= resizeThreshold) {
          const ctx = canvas.getContext("2d");
          const maxWidth = 900; // Resize width
          const scaleSize = maxWidth / img.width;
          const width = maxWidth;
          const height = img.height * scaleSize;
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          let quality = 0.9;
          let resizedImage = canvas.toDataURL("image/jpeg", quality);
          setSelectedFile(resizedImage);
          onImageUpload(file);
          setErrorMessage(null);
          setIsValidBool("valid");
          return;
        }

        const ctx = canvas.getContext("2d");
        const maxWidth = 300; // Resize width
        const scaleSize = maxWidth / img.width;
        const width = maxWidth;
        const height = img.height * scaleSize;
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        let quality = 1;
        let resizedImage = canvas.toDataURL("image/jpeg", quality);
        while (resizedImage.length > maxOutputSize && quality > 0.1) {
          quality -= 0.05;
          resizedImage = canvas.toDataURL("image/jpeg", quality);
        }

        setSelectedFile(resizedImage);
        onImageUpload(base64ToFile(resizedImage, "new_upload"));
        setErrorMessage(null); // Clear previous errors
        setIsValidBool("valid");
      };
    };
  };

  function resetState() {
    setSelectedFile(null);
    setErrorMessage(null);
    setIsValidBool("empty");
  }

  useImperativeHandle(ref, () => ({
    resetState,
  }));

  function base64ToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(",");
    if (!arr || arr.length !== 2) {
      throw new Error("Invalid base64 string format");
    }

    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error("Invalid mime type in base64 string");
    }

    const mime = mimeMatch[1];
    const bstr = Buffer.from(arr[1], "base64");
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr[i];
    }

    return new File([u8arr], filename, { type: mime });
  }

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="text"
        className="font-medium text-black text-sm flex flex-row justify-between"
      >
        <span>
          {labelText}
          <span className="text-red-700">{isRequired ? "*" : ""}</span>
        </span>

        {isValidBool === "valid" && (
          <CheckIcon width="13" height="13" viewBox="0 0 13 13" />
        )}
        {isValidBool === "invalid" && (
          <ErrorIcon width="13" height="13" viewBox="0 0 13 13" />
        )}
      </label>

      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          hidden
          ref={filePickerRef}
          onChange={addImageToForm}
        />

        <div
          onClick={() => {
            if (selectedFile) {
              setSelectedFile(null);
            } else {
              filePickerRef.current.click();
            }
          }}
          className={`flex-row items-center bg-white p-3
    focus:ring-transparent font-medium text-black w-full placeholder:text-neutral-400 text-base
    md:text-sm lg:text-sm outline-none tracking-[0px] rounded-lg border-[1px] border-transparent active:border-neutral-300 focus:border-neutral-300 flex justify-between  cursor-pointer`}
        >
          {placeholderText}
          <div>
            {selectedFile ? (
              <DeleteIcon fill="#b91c1c " />
            ) : (
              <AttachIcon className="rotate-[135deg]" />
            )}
          </div>
        </div>

        <div
          className={`${
            isCircular ? "rounded-full" : "rounded-2xl"
          } ${sizeHW} flex flex-row justify-center items-center mb-5 mt-4 bg-neutral-600`}
        >
          {selectedFile || initImgUrl ? (
            <NextImage
              className={
                (isCircular ? "rounded-full " : "rounded-2xl ") + sizeHW
              }
              src={(selectedFile || initImgUrl) as string}
              alt=""
              width={500}
              height={500}
              unoptimized
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : (
            <ImageIcon
              fill="#A2A2A2"
              width="70"
              height="70"
              viewBox="0 0 208 208"
            />
          )}
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
});

ImageUploadComponent.displayName = "ImageUploadComponent";

export default ImageUploadComponent;
