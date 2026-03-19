import React, { RefObject, useEffect, useRef, useState, useCallback } from "react";
import {
  CareerTypeEnumValues,
  CreateCareerSchema,
  CreateCareerWithFileSchema,
} from "@/backend/models/careers";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAppDispatch } from "@/redux/app/hooks";
import * as careersRedux from "@/redux/features/careers";
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

export function CreateCareerModal() {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalRef}
      buttonTitle={"Create new"}
      modalSize={"large"}
    >
      <CreateCareerForm dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateCareerSchema;
type Props = {
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateCareerForm({ dashboardModalRef }: Props) {
  const initialFormState = {
    title: null,
    description: null,
    content: null,
    location: null,
    type: null,
    applyUrl: null,
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

  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isFormFilled = useCallback(() => {
    const { applyUrl, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null) && selectedFile;
  }, [formState, selectedFile]);

  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    try {
      const processedContent = await processContentImages(formState.content);

      const request: CreateCareerWithFileSchema = {
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          content: processedContent,
          description: formState.description,
          location: formState.location,
          type: formState.type,
          applyUrl: formState.applyUrl || null,
          imgUrl: null,
          isActive: true,
        },
        file: selectedFile!,
      };

      await dispatch(
        careersRedux.actions.createCareerAsync({
          data: request,
        })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Your career was created successfully",
          });

          resetFormState();
          dispatch(careersRedux.actions.fetchCareerWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error uploading your career",
          });
        }
        setComponentState(ComponentStateEnum.DISABLED);
      });

      return request;
    } catch (error) {
      console.error("Error processing career content:", error);
      ErrorToast({
        message: "There was an error processing your career images",
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
      imageUploadRef.current.resetState();
    }
  }

  useEffect(() => {
    console.table(formState);
  }, [formState]);

  return (
    <div className="h-full w-full flex flex-row px-6 gap-4 pb-4">
      {/* Career details form */}
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
              maxFileSize={5 * 1024 * 1024}
              maxOutputSize={2 * 1024 * 1024}
              onImageUpload={handleImageUpload}
              placeholderText="Image should be a PNG/JPG with size below 5MB"
              isCircular={false}
              sizeHW="h-200 w-[390px]"
            />

            <TextInput
              validationRegex={/^.{3,}$/}
              onInputChange={(val: any) => onChangeHandler("title", val)}
              value={formState.title}
              placeholderText="Enter career title"
              labelText="Career title"
            />

            <TextArea
              onInputChange={(val: any) => onChangeHandler("description", val)}
              value={formState.description}
              maxLength={3000}
              placeholderText="Add summary for the career"
              labelText="Description (Summary)"
            />

            <TextInput
              validationRegex={/^.{2,}$/}
              onInputChange={(val: any) => onChangeHandler("location", val)}
              value={formState.location}
              placeholderText="e.g. Remote, Accra Ghana"
              labelText="Location"
            />

            <TagSingleSelect
              chipList={CareerTypeEnumValues}
              isRequired
              labelText="Select the career type"
              onInputChange={(val: any) => onChangeHandler("type", val)}
              value={formState.type}
            />

            <TextInput
              validationRegex={/^.{0,}$/}
              onInputChange={(val: any) => onChangeHandler("applyUrl", val)}
              value={formState.applyUrl}
              placeholderText="https://..."
              labelText="Apply URL (optional)"
            />
          </form>
        </div>

        <div className=" w-full flex flex-row items-center justify-center">
          <DashboardButton
            isLoading={componentState === ComponentStateEnum.LOADING}
            isWide
            onClicked={async () => {
              await submitFormHandler();
            }}
            disabled={!isFormFilled()}
            title={"Create Career"}
          />
        </div>
      </div>

      {/* Career content */}
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
