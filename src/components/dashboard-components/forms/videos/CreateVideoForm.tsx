import React, { RefObject, useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  MediaTypeEnumValues,
  CreateVideoSchema,
  CreateVideoWithFileSchema,
} from "@/backend/models/videos";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAppDispatch } from "@/redux/app/hooks";
import * as videosRedux from "@/redux/features/videos";
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

export function CreateVideoModal() {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalRef}
      buttonTitle={"Create new"}
      modalSize={"medium"}
    >
      <CreateVideoForm dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateVideoSchema;
type Props = {
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateVideoForm({ dashboardModalRef }: Props) {
  const initialFormState = {
    title: null,
    description: null,
    link: null,
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
      const request: CreateVideoWithFileSchema = {
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          link: formState.link,
          type: formState.type,
          imgUrl: null,
        },
        file: selectedFile!,
      };

      await dispatch(
        videosRedux.actions.createVideoAsync({
          data: request,
        })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Your video/podcast was created successfully",
          });

          resetFormState();
          dispatch(videosRedux.actions.fetchVideoWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error uploading your video/podcast",
          });
        }
        setComponentState(ComponentStateEnum.DISABLED);
      });

      return request;
    } catch (error) {
      console.error("Error creating video/podcast:", error);
      ErrorToast({
        message: "There was an error creating your video/podcast",
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
    <div className="h-full w-full flex flex-col px-6 gap-4 pb-4">
      <div className="flex-1 flex flex-col gap-4 h-full">
        <div
          className="flex-1 p-8 flex flex-col gap-4 h-full overflow-y-scroll
          bg-neutral-200 rounded-xl md:p-8"
        >
          <form action="" className="flex flex-col gap-8">
            <ImageUploadComponent
              isRequired={false}
              ref={imageUploadRef}
              labelText="Upload thumbnail image"
              maxFileSize={5 * 1024 * 1024}
              maxOutputSize={2 * 1024 * 1024}
              onImageUpload={handleImageUpload}
              placeholderText="Image should be a PNG/JPG with size below 5MB"
              isCircular={false}
              sizeHW="h-200 w-full"
            />

            <TextInput
              validationRegex={/^.{3,}$/}
              onInputChange={(val: any) => onChangeHandler("title", val)}
              value={formState.title}
              placeholderText="Enter video/podcast title"
              labelText="Title"
            />

            <TextArea
              onInputChange={(val: any) => onChangeHandler("description", val)}
              value={formState.description}
              maxLength={3000}
              placeholderText="Add a description"
              labelText="Description"
            />

            <TextInput
              validationRegex={/^https?:\/\/.+/}
              onInputChange={(val: any) => onChangeHandler("link", val)}
              value={formState.link}
              placeholderText="Paste embed URL (YouTube or Spotify)"
              labelText="Embed Link"
            />

            <TagSingleSelect
              chipList={MediaTypeEnumValues}
              isRequired
              labelText="Select the media type"
              onInputChange={(val: any) => onChangeHandler("type", val)}
              value={formState.type}
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
            title={"Create Video/Podcast"}
          />
        </div>
      </div>
    </div>
  );
}
