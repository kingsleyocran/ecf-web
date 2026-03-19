import React, { RefObject, useRef, useState } from "react";
import {
  ReportSchema,
  UpdateReportSchema,
  UpdateReportWithFilesSchema,
} from "@/backend/models/reports";
import { useAppDispatch } from "@/redux/app/hooks";
import * as reportsRedux from "@/redux/features/reports";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { _DashboardFormModalBaseRef } from "../../components/_base/_DashboardFormModalBase";
import DashboardButton from "../../components/others/DashboardButton";
import ImageUploadComponent, {
  ImageUploadComponentRef,
} from "../../components/input/ImageUploadComponent";
import TextInput from "../../components/input/TextInput";
import TextArea from "../../components/input/TextArea";

type FormFieldNames = keyof UpdateReportSchema;
type Props = {
  data: ReportSchema;
  disableDelete?: boolean;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function UpdateReportForm({
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
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);

  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isFormFilled = () => {
    const { id, coverImgUrl, pdfUrl, createdAt, updatedAt, titleSearch, isActive, ...rest } =
      formState;
    return Object.values(rest).every((value) => value !== null);
  };

  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    try {
      const request: UpdateReportWithFilesSchema = {
        id: data.id,
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          publishedDate: formState.publishedDate,
          isActive: formState.isActive,
          coverImgUrl: formState.coverImgUrl,
          pdfUrl: formState.pdfUrl,
        },
        coverFile: selectedCoverFile,
        pdfFile: selectedPdfFile,
      };

      await dispatch(
        reportsRedux.actions.updateReportAsync({ data: request })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Report has been updated" });
          dispatch(reportsRedux.actions.fetchReportWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error updating the report" });
        }
        setEditIsLoading(false);
      });
    } catch (error) {
      console.error("Error updating report:", error);
      ErrorToast({ message: "There was an error updating the report" });
      setEditIsLoading(false);
    }
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(reportsRedux.actions.deleteReportAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({ message: "Report deleted" });
          dispatch(reportsRedux.actions.fetchReportWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({ message: "There was an error deleting the report" });
        }
        setDeleteIsLoading(false);
      }
    );
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
              labelText="Upload cover image"
              maxFileSize={5 * 1024 * 1024}
              maxOutputSize={2 * 1024 * 1024}
              onImageUpload={(file) => setSelectedCoverFile(file)}
              placeholderText="Cover image — PNG/JPG below 5MB"
              isCircular={false}
              sizeHW="h-200 w-full"
            />

            {/* PDF Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Replace PDF Document
              </label>
              {data.pdfUrl && (
                <p className="text-xs text-gray-500">
                  Current PDF is uploaded. Select a new file to replace it.
                </p>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setSelectedPdfFile(file);
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedPdfFile && (
                <p className="text-xs text-green-600">
                  New file: {selectedPdfFile.name}
                </p>
              )}
            </div>

            <TextInput
              validationRegex={/^.{3,}$/}
              onInputChange={(val: any) => onChangeHandler("title", val)}
              value={formState.title}
              placeholderText="Enter report title"
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
              validationRegex={/^.{3,}$/}
              onInputChange={(val: any) =>
                onChangeHandler("publishedDate", val)
              }
              value={formState.publishedDate}
              placeholderText="e.g. March 2025"
              labelText="Published Date"
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
            title={"Update Report"}
          />
        </div>
      </div>
    </div>
  );
}
