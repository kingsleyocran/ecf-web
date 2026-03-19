import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  ArticleSchema,
  UpdateArticleSchema,
  UpdateArticleWithFileSchema,
} from "@/backend/models/articles";
import { useAppDispatch } from "@/redux/app/hooks";
import * as articlesRedux from "@/redux/features/articles";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import DashboardButton from "../../components/others/DashboardButton";
import ImageUploadComponent, {
  ImageUploadComponentRef,
} from "../../components/input/ImageUploadComponent";
import TextInput from "../../components/input/TextInput";
import TextArea from "../../components/input/TextArea";
import {
  processContentImages,
  cleanupRemovedImages,
} from "@/backend/firebase/storage/storage_func";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type FormFieldNames = keyof UpdateArticleSchema;
type Props = {
  data: ArticleSchema;
  updateStorageProfileData?: boolean;
  disableDelete?: boolean;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function UpdateArticleForm({
  data,
  dashboardModalRef,
  disableDelete = false,
}: Props) {
  const initialFormState = { ...data };

  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const imageUploadRef = useRef<ImageUploadComponentRef>(null);
  const [formState, setFormState] = useState<any>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleImageUpload = (file: File | null) => {
    setSelectedFile(file);
  };

  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isFormFilled = () => {
    const { id, author, imgUrl, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null);
  };

  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    try {
      const originalContent = data.content;
      const processedContent = await processContentImages(formState.content);
      await cleanupRemovedImages(originalContent, processedContent);

      const request: UpdateArticleWithFileSchema = {
        id: data.id,
        data: {
          name: formState.name,
          nameSearch: formState.name.toLowerCase(),
          author: formState.author,
          content: processedContent,
          description: formState.description,
          imgUrl: formState.imgUrl,
        },
        file: selectedFile,
      };

      await dispatch(
        articlesRedux.actions.updateArticleAsync({ data: request })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Article has been updated" });
          dispatch(articlesRedux.actions.fetchArticleWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error updating the article" });
        }
        setEditIsLoading(false);
      });

      return request;
    } catch (error) {
      console.error("Error processing article content:", error);
      ErrorToast({
        message: "There was an error processing your article images",
      });
      setEditIsLoading(false);
    }
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(articlesRedux.actions.deleteArticleAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Article deleted" });
          dispatch(articlesRedux.actions.fetchArticleWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error deleting article" });
        }
        setDeleteIsLoading(false);
      }
    );
  }

  return (
    <div className="h-full w-full flex flex-row px-6 gap-4 pb-4">
      {/* Article details form */}
      <div className="flex-none w-[470px] flex flex-col gap-4 h-full">
        <div
          className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll
          bg-neutral-200 rounded-xl md:p-8"
        >
          <form action="" className="flex flex-col gap-8">
            <ImageUploadComponent
              isRequired={false}
              ref={imageUploadRef}
              labelText="Please upload your image"
              maxFileSize={5 * 1024 * 1024}
              maxOutputSize={2 * 1024 * 1024}
              onImageUpload={handleImageUpload}
              placeholderText="Image should be a PNG/JPG with size below 5MB"
              isCircular={false}
              sizeHW="h-200 w-[390px]"
            />

            <TextInput
              validationRegex={/^.{3,}$/}
              onInputChange={(val: any) => onChangeHandler("name", val)}
              value={formState.name}
              placeholderText="Enter article title"
              labelText="Article title"
            />

            <TextArea
              onInputChange={(val: any) => onChangeHandler("description", val)}
              value={formState.description}
              maxLength={3000}
              placeholderText="Add summary for the article"
              labelText="Context (Summary)"
            />

            <TextInput
              validationRegex={/^.{0,}$/}
              onInputChange={(val: any) => onChangeHandler("author", val)}
              value={formState.author}
              placeholderText="Enter author name"
              labelText="Author (optional)"
            />
          </form>
        </div>

        <div className="w-full flex flex-row gap-4 items-center justify-center">
          {!disableDelete && (
            <DashboardButton
              isLoading={deleteIsLoading}
              isWide
              onClicked={async () => {
                await deleteHandler();
              }}
              title={"Delete"}
              buttonColor="#dc2626"
            />
          )}

          <DashboardButton
            isLoading={editIsLoading}
            isWide
            onClicked={async () => {
              await editHandler();
            }}
            disabled={!isFormFilled()}
            title={"Update Article"}
          />
        </div>
      </div>

      {/* Article content */}
      <div
        className="flex-1 flex rounded-xl flex-col gap-3 h-full overflow-hidden
        bg-neutral-200 p-6 relative"
      >
        <ReactQuill
          className={
            "ql-no-border pb-12 h-full relative overflow-hidden !rounded-xl !bg-white"
          }
          theme="snow"
          value={formState.content}
          onChange={(val: any) => {
            onChangeHandler("content", val);
          }}
          modules={{
            toolbar: {
              container: [
                [{ header: [3, 4, 5, 6, false] }],
                [
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "code-block",
                ],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
              ],
            },
          }}
        />
      </div>
    </div>
  );
}
