import React, { RefObject, useEffect, useRef, useState, useCallback } from "react";
import {
  CreateEventSchema,
  CreateEventWithFileSchema,
  EventTypeEnumValues,
} from "@/backend/models/events";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAppDispatch } from "@/redux/app/hooks";
import * as eventsRedux from "@/redux/features/events";
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

export function CreateEventModal() {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalRef}
      buttonTitle={"Create new"}
      modalSize={"large"}
    >
      <CreateEventForm dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateEventSchema;
type Props = {
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateEventForm({ dashboardModalRef }: Props) {
  const initialFormState = {
    title: null,
    description: null,
    location: null,
    date: null,
    type: null,
    content: null,
    registrationUrl: null,
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
    const { registrationUrl, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null) && selectedFile;
  }, [formState, selectedFile]);

  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    try {
      const processedContent = await processContentImages(formState.content);

      const request: CreateEventWithFileSchema = {
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          location: formState.location,
          date: formState.date,
          type: formState.type,
          content: processedContent,
          registrationUrl: formState.registrationUrl || null,
          imgUrl: null,
        },
        file: selectedFile!,
      };

      await dispatch(
        eventsRedux.actions.createEventAsync({
          data: request,
        })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Your event was created successfully",
          });
          resetFormState();
          dispatch(eventsRedux.actions.fetchEventWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error creating your event",
          });
        }
        setComponentState(ComponentStateEnum.DISABLED);
      });
    } catch (error) {
      console.error("Error processing event content:", error);
      ErrorToast({
        message: "There was an error processing your event images",
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
              labelText="Please upload event image"
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
              placeholderText="Enter event title"
              labelText="Event title"
            />

            <TextArea
              onInputChange={(val: any) => onChangeHandler("description", val)}
              value={formState.description}
              maxLength={3000}
              placeholderText="Add description for the event"
              labelText="Description"
            />

            <TextInput
              validationRegex={/^.{2,}$/}
              onInputChange={(val: any) => onChangeHandler("location", val)}
              value={formState.location}
              placeholderText="e.g. Accra, Ghana or Virtual"
              labelText="Location"
            />

            <TextInput
              validationRegex={/^.{2,}$/}
              onInputChange={(val: any) => onChangeHandler("date", val)}
              value={formState.date}
              placeholderText="e.g. April 10, 2025"
              labelText="Date"
            />

            <TagSingleSelect
              chipList={EventTypeEnumValues}
              isRequired
              labelText="Select event type"
              onInputChange={(val: any) => onChangeHandler("type", val)}
              value={formState.type}
            />

            <TextInput
              validationRegex={/^.{0,}$/}
              onInputChange={(val: any) => onChangeHandler("registrationUrl", val)}
              value={formState.registrationUrl}
              placeholderText="https://..."
              labelText="Registration URL (optional)"
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
            title={"Create Event"}
          />
        </div>
      </div>

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
