import React, { RefObject, useRef, useState } from "react";
import {
  EventSchema,
  UpdateEventSchema,
  UpdateEventWithFileSchema,
  EventTypeEnumValues,
} from "@/backend/models/events";
import { useAppDispatch } from "@/redux/app/hooks";
import * as eventsRedux from "@/redux/features/events";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import DashboardButton from "../../components/others/DashboardButton";
import ImageUploadComponent, {
  ImageUploadComponentRef,
} from "../../components/input/ImageUploadComponent";
import TextInput from "../../components/input/TextInput";
import TextArea from "../../components/input/TextArea";
import TagSingleSelect from "../../components/input/TagSingleSelect";
import EventDateTimeInput, { EventDateTimeValue } from "../../components/input/EventDateTimeInput";
import {
  processContentImages,
  cleanupRemovedImages,
} from "@/backend/firebase/storage/storage_func";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type FormFieldNames = keyof UpdateEventSchema;
type Props = {
  data: EventSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};
export default function UpdateEventForm({
  data,
  dashboardModalRef,
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
    const { id, imgUrl, registrationUrl, virtualLink, startDateTime, timezone, content, isActive, createdAt, updatedAt, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null);
  };

  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    try {
      const originalContent = data.content ?? "";
      const processedContent = await processContentImages(formState.content ?? "");
      await cleanupRemovedImages(originalContent, processedContent);

      const request: UpdateEventWithFileSchema = {
        id: data.id,
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          location: formState.location,
          date: formState.date,
          startDateTime: formState.startDateTime || null,
          timezone: formState.timezone || null,
          type: formState.type,
          content: processedContent,
          registrationUrl: formState.registrationUrl || null,
          virtualLink: formState.virtualLink || null,
          imgUrl: formState.imgUrl,
        },
        file: selectedFile,
      };

      await dispatch(
        eventsRedux.actions.updateEventAsync({ data: request })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Event has been updated" });
          dispatch(eventsRedux.actions.fetchEventWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error updating the event" });
        }
        setEditIsLoading(false);
      });
    } catch (error) {
      console.error("Error processing event content:", error);
      ErrorToast({ message: "There was an error processing your event images" });
      setEditIsLoading(false);
    }
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(eventsRedux.actions.deleteEventAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Event deleted" });
          dispatch(eventsRedux.actions.fetchEventWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error deleting event" });
        }
        setDeleteIsLoading(false);
      }
    );
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

            <EventDateTimeInput
              labelText="Event Date & Time"
              onInputChange={(val: EventDateTimeValue | null) => {
                onChangeHandler("date", val?.displayDate ?? formState.date);
                onChangeHandler("startDateTime", val?.isoString ?? formState.startDateTime);
                onChangeHandler("timezone", val?.timezone ?? formState.timezone);
              }}
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

            <TextInput
              validationRegex={/^.{0,}$/}
              onInputChange={(val: any) => onChangeHandler("virtualLink", val)}
              value={formState.virtualLink}
              placeholderText="https://meet.google.com/..."
              labelText="Virtual Join Link (optional)"
            />
          </form>
        </div>

        <div className="w-full flex flex-row gap-4 items-center justify-center">
          <DashboardButton
            isLoading={deleteIsLoading}
            isWide
            onClicked={async () => {
              await deleteHandler();
            }}
            title={"Delete"}
            buttonColor="#dc2626"
          />

          <DashboardButton
            isLoading={editIsLoading}
            isWide
            onClicked={async () => {
              await editHandler();
            }}
            disabled={!isFormFilled()}
            title={"Update Event"}
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
