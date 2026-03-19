import React, { RefObject, useEffect, useRef, useState, useCallback } from "react";
import {
  CreateNewsletterSchema,
  CreateNewsletterWithFileSchema,
} from "@/backend/models/newsletters";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAppDispatch } from "@/redux/app/hooks";
import * as newslettersRedux from "@/redux/features/newsletters";
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

export function CreateNewsletterModal() {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalRef}
      buttonTitle={"Create new"}
      modalSize={"large"}
    >
      <CreateNewsletterForm dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateNewsletterSchema;
type Props = {
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateNewsletterForm({ dashboardModalRef }: Props) {
  const initialFormState = {
    title: null,
    description: null,
    content: null,
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
    return Object.values(formState).every((value) => value !== null) && selectedFile;
  }, [formState, selectedFile]);

  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    try {
      const request: CreateNewsletterWithFileSchema = {
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          content: formState.content,
          imgUrl: null,
        },
        file: selectedFile!,
      };

      await dispatch(
        newslettersRedux.actions.createNewsletterAsync({
          data: request,
        })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Your newsletter was created successfully",
          });
          resetFormState();
          dispatch(newslettersRedux.actions.fetchNewsletterWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error creating your newsletter",
          });
        }
        setComponentState(ComponentStateEnum.DISABLED);
      });
    } catch (error) {
      console.error("Error creating newsletter:", error);
      ErrorToast({
        message: "There was an error creating your newsletter",
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

  return (
    <div className="h-full w-full flex flex-row px-6 gap-4 pb-4">
      <div className="flex-none w-[470px] flex flex-col gap-4 h-full">
        <div
          className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll
          bg-neutral-200 rounded-xl md:p-8"
        >
          <form action="" className="flex flex-col gap-8">
            <ImageUploadComponent
              isRequired={false}
              ref={imageUploadRef}
              labelText="Please upload newsletter image"
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
              placeholderText="Enter newsletter title"
              labelText="Newsletter title"
            />

            <TextArea
              onInputChange={(val: any) => onChangeHandler("description", val)}
              value={formState.description}
              maxLength={3000}
              placeholderText="Add a brief description"
              labelText="Description"
            />
          </form>
        </div>

        <div className="w-full flex flex-row items-center justify-center">
          <DashboardButton
            isLoading={componentState === ComponentStateEnum.LOADING}
            isWide
            onClicked={async () => {
              await submitFormHandler();
            }}
            disabled={!isFormFilled()}
            title={"Create Newsletter"}
          />
        </div>
      </div>

      {/* HTML content textarea */}
      <div
        className="flex-1 flex rounded-xl flex-col gap-3 h-full overflow-hidden
        bg-neutral-200 p-6 relative"
      >
        <label className="text-sm font-medium text-black/70">
          Newsletter HTML Content
        </label>
        <textarea
          className="flex-1 w-full h-full p-4 rounded-xl bg-white border border-neutral-300
            font-mono text-sm text-black resize-none focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:border-transparent"
          placeholder="Paste your newsletter HTML code here..."
          value={formState.content || ""}
          onChange={(e) => onChangeHandler("content", e.target.value || null)}
        />
      </div>
    </div>
  );
}
