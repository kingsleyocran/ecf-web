import React, { RefObject, useRef, useState } from "react";
import {
  NewsletterSchema,
  UpdateNewsletterSchema,
  UpdateNewsletterWithFileSchema,
} from "@/backend/models/newsletters";
import { useAppDispatch } from "@/redux/app/hooks";
import * as newslettersRedux from "@/redux/features/newsletters";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import DashboardButton from "../../components/others/DashboardButton";
import ImageUploadComponent, {
  ImageUploadComponentRef,
} from "../../components/input/ImageUploadComponent";
import TextInput from "../../components/input/TextInput";
import TextArea from "../../components/input/TextArea";

type FormFieldNames = keyof UpdateNewsletterSchema;
type Props = {
  data: NewsletterSchema;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};
export default function UpdateNewsletterForm({
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
    const { id, imgUrl, isActive, createdAt, updatedAt, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null);
  };

  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    try {
      const request: UpdateNewsletterWithFileSchema = {
        id: data.id,
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          content: formState.content,
          imgUrl: formState.imgUrl,
        },
        file: selectedFile,
      };

      await dispatch(
        newslettersRedux.actions.updateNewsletterAsync({ data: request })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Newsletter has been updated" });
          dispatch(newslettersRedux.actions.fetchNewsletterWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error updating the newsletter" });
        }
        setEditIsLoading(false);
      });
    } catch (error) {
      console.error("Error updating newsletter:", error);
      ErrorToast({ message: "There was an error updating your newsletter" });
      setEditIsLoading(false);
    }
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(newslettersRedux.actions.deleteNewsletterAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Newsletter deleted" });
          dispatch(newslettersRedux.actions.fetchNewsletterWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error deleting newsletter" });
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
            title={"Update Newsletter"}
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
