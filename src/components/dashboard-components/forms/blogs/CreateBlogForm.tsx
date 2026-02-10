import React, { RefObject, useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  BlogEnumValues,
  CreateBlogSchema,
  CreateBlogWithFileSchema,
} from "@/backend/models/blogs";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
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
import { processContentImages } from "@/backend/firebase/storage/storage_func";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function CreateBlogModal() {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalRef}
      buttonTitle={"Create new"}
      modalSize={"large"}
    >
      <CreateBlogForm dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateBlogSchema;
type Props = {
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateBlogForm({ dashboardModalRef }: Props) {
  const initialFormState = {
    name: null,
    author: null,
    description: null,
    content: null,
    type: null,
  };

  const dispatch = useAppDispatch();
  const imageUploadRef = useRef<ImageUploadComponentRef>(null);
  const [formState, setFormState] = useState<any>(initialFormState);
  const [componentState, setComponentState] =
    useState<ComponentStateEnumValues>(ComponentStateEnum.IDLE);
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
  const isFormFilled = useCallback(() => {
    const { author, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null) && selectedFile;
  }, [formState, selectedFile]);

  // Function to handle the form submission with preventDefault
  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    try {
      // Process content to upload base64 images to Firebase and replace with URLs
      const processedContent = await processContentImages(formState.content);

      const request: CreateBlogWithFileSchema = {
        data: {
          name: formState.name,
          nameSearch: formState.name.toLowerCase(),
          author: formState.author,
          content: processedContent,
          description: formState.description,
          type: formState.type,
          imgUrl: null,
        },
        file: selectedFile!,
      };

      await dispatch(
        blogsRedux.actions.createBlogAsync({
          data: request,
        })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Your blog was created successfully",
          });

          resetFormState();
          dispatch(blogsRedux.actions.fetchBlogWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error uploading your blog",
          });
        }
        setComponentState(ComponentStateEnum.DISABLED);
      });

      return request;
    } catch (error) {
      console.error("Error processing blog content:", error);
      ErrorToast({
        message: "There was an error processing your blog images",
      });
      setComponentState(ComponentStateEnum.IDLE);
    }
  }

  useEffect(() => {
    if (isFormFilled() && componentState !== ComponentStateEnum.LOADING)
      setComponentState(ComponentStateEnum.IDLE);
  }, [setComponentState, isFormFilled, componentState]);

  function resetFormState() {
    setFormState(initialFormState);
    if (imageUploadRef.current) {
      imageUploadRef.current.resetState(); // Call resetState from the parent component
    }
  }

  useEffect(() => {
    console.table(formState);
    console.log(formState.content);
    // console.log(convertToMD(editorHtml));
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
              value={formState.authorID}
            />
          </form>
        </div>

        <div className=" w-full flex flex-row items-center justify-center">
          {/* Approve Button */}
          <DashboardButton
            isLoading={componentState === ComponentStateEnum.LOADING}
            isWide
            onClicked={async () => {
              await submitFormHandler();
            }}
            disabled={!isFormFilled()}
            title={"Create Blog"}
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
