import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  BlogEnumValues,
  BlogSchema,
  UpdateBlogSchema,
  UpdateBlogWithFileSchema,
} from "@/backend/models/blogs";
import { useAppDispatch } from "@/redux/app/hooks";
import * as blogsRedux from "@/redux/features/blogs";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import _DashboardFormModalBase, {
  _DashboardFormModalBaseRef,
} from "../../components/_base/_DashboardFormModalBase";
import DashboardButton from "../../components/others/DashboardButton";
import ImageUploadComponent, {
  ImageUploadComponentRef,
} from "../../components/input/ImageUploadComponent";
import TextInput from "../../components/input/TextInput";
import TextArea from "../../components/input/TextArea";
import TagSingleSelect from "../../components/input/TagSingleSelect";
import {
  processContentImages,
  cleanupRemovedImages,
} from "@/backend/firebase/storage/storage_func";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type UpdateNetworkMemberModalProps = {
  data: BlogSchema;
  updateStorageProfileData: boolean;
  disableDelete: boolean;
};
export function UpdateNetworkMemberModal({
  data,
  updateStorageProfileData,
  disableDelete,
}: UpdateNetworkMemberModalProps) {
  const modalUpdateRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalUpdateRef}
      buttonTitle={"Update blog"}
      modalSize="large"
    >
      <UpdateNetworkMemberForm
        data={data}
        dashboardModalRef={modalUpdateRef}
        updateStorageProfileData={updateStorageProfileData}
        disableDelete={disableDelete}
      />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof UpdateBlogSchema;
type Props = {
  data: BlogSchema;
  updateStorageProfileData?: boolean;
  disableDelete?: boolean;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};
export default function UpdateNetworkMemberForm({
  data,
  dashboardModalRef,
  disableDelete = false,
  updateStorageProfileData = false,
}: Props) {
  const initialFormState = {
    ...data,
  };

  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const imageUploadRef = useRef<ImageUploadComponentRef>(null);
  const [formState, setFormState] = useState<any>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleImageUpload = (file: File | null) => {
    setSelectedFile(file);
  };

  // change handler
  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  // logic to check if form is fully filled
  const isFormFilled = () => {
    const { id, author, imgUrl, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null);
  };

  // Function to handle the form submission with preventDefault
  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    try {
      // Store the original content for comparison
      const originalContent = data.content;

      // Process content to upload base64 images to Firebase and replace with URLs
      const processedContent = await processContentImages(formState.content);

      // Clean up images that were removed from the content
      await cleanupRemovedImages(originalContent, processedContent);

      const request: UpdateBlogWithFileSchema = {
        id: data.id,
        data: {
          name: formState.name,
          nameSearch: formState.name.toLowerCase(),
          author: formState.author,
          content: processedContent,
          description: formState.description,
          type: formState.type,
          imgUrl: formState.imgUrl,
        },
        file: selectedFile,
      };

      await dispatch(
        blogsRedux.actions.updateBlogAsync({ data: request })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Blog has been updated",
          });
          dispatch(blogsRedux.actions.fetchBlogWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error updating the blog",
          });
        }

        setEditIsLoading(false);
      });

      return request;
    } catch (error) {
      console.error("Error processing blog content:", error);
      ErrorToast({
        message: "There was an error processing your blog images",
      });
      setEditIsLoading(false);
    }
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(blogsRedux.actions.deleteBlogAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Blog deleted",
          });
          dispatch(blogsRedux.actions.fetchBlogWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error deleting blog",
          });
        }
        setDeleteIsLoading(false);
      }
    );
  }

  useEffect(() => {
    console.table(formState);
  }, [formState]);

  return (
    <div className="h-full w-full flex flex-row px-6 gap-4 pb-4">
      {/* Blod details form */}
      <div className="flex-none w-[470px] flex flex-col gap-4 h-full">
        <div
          className="flex-1 p-8  flex flex-col gap-4 h-full overflow-y-scroll
          bg-neutral-200 rounded-xl md:p-8 "
        >
          <form action="" className="flex flex-col gap-8">
            <ImageUploadComponent
              isRequired={false}
              ref={imageUploadRef}
              labelText="Please upload your image"
              maxFileSize={5 * 1024 * 1024} // 5 MB file size limit
              maxOutputSize={2 * 1024 * 1024} // {600 * 1024} 600 KB resized output limit
              onImageUpload={handleImageUpload} // Callback for the uploaded image
              placeholderText="Image should be a PNG/JPG with size below 5MB"
              isCircular={false}
              sizeHW="h-200 w-[390px]"
            />

            <TextInput
              validationRegex={/^.{3,}$/}
              onInputChange={(val: any) => onChangeHandler("name", val)}
              value={formState.name}
              placeholderText="Enter blog title"
              labelText="Blog title"
            />

            <TextArea
              onInputChange={(val: any) => onChangeHandler("description", val)}
              value={formState.description}
              maxLength={3000}
              placeholderText="Add summary for the blog"
              labelText="Context (Summary)"
            />

            <TagSingleSelect
              chipList={BlogEnumValues}
              isRequired
              labelText="Select the blog type"
              onInputChange={(val: any) => onChangeHandler("type", val)}
              value={formState.type}
            />
          </form>
        </div>

        <div className=" w-full flex flex-row gap-4 items-center justify-center">
          {/* Delete Button */}
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

          {/* Edit Button */}
          <DashboardButton
            isLoading={editIsLoading}
            isWide
            onClicked={async () => {
              await editHandler();
            }}
            disabled={!isFormFilled()}
            title={"Update blog"}
          />
        </div>
      </div>

      {/* Blog content */}
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
                //["clean"],
              ],
              // handlers: {
              //   image: imageHandler,
              // },
            },
          }}
        />
      </div>
    </div>
  );
}
