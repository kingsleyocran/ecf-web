import React, { RefObject, useEffect, useRef, useState, useCallback } from "react";
import {
  CreateReportSchema,
  CreateReportWithFilesSchema,
} from "@/backend/models/reports";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAppDispatch } from "@/redux/app/hooks";
import * as reportsRedux from "@/redux/features/reports";
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

export function CreateReportModal() {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase
      ref={modalRef}
      buttonTitle={"Create new"}
      modalSize={"medium"}
    >
      <CreateReportForm dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateReportSchema;
type Props = {
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateReportForm({ dashboardModalRef }: Props) {
  const initialFormState = {
    title: null,
    description: null,
    publishedDate: null,
  };

  const dispatch = useAppDispatch();
  const imageUploadRef = useRef<ImageUploadComponentRef>(null);
  const [formState, setFormState] = useState<any>(initialFormState);
  const [componentState, setComponentState] =
    useState<ComponentStateEnumValues>(ComponentStateEnum.IDLE);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);

  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isFormFilled = useCallback(() => {
    return (
      Object.values(formState).every((value) => value !== null) &&
      selectedCoverFile &&
      selectedPdfFile
    );
  }, [formState, selectedCoverFile, selectedPdfFile]);

  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    try {
      const request: CreateReportWithFilesSchema = {
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          publishedDate: formState.publishedDate,
          isActive: true,
          coverImgUrl: null,
          pdfUrl: null,
        },
        coverFile: selectedCoverFile!,
        pdfFile: selectedPdfFile!,
      };

      await dispatch(
        reportsRedux.actions.createReportAsync({
          data: request,
        })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Report was created successfully",
          });

          resetFormState();
          dispatch(reportsRedux.actions.fetchReportWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error uploading the report",
          });
        }
        setComponentState(ComponentStateEnum.DISABLED);
      });

      return request;
    } catch (error) {
      console.error("Error creating report:", error);
      ErrorToast({
        message: "There was an error creating the report",
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
    setSelectedPdfFile(null);
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
                Upload PDF Document <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setSelectedPdfFile(file);
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {selectedPdfFile && (
                <p className="text-xs text-green-600">
                  Selected: {selectedPdfFile.name}
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

        <div className="w-full flex flex-row items-center justify-center">
          <DashboardButton
            isLoading={componentState === ComponentStateEnum.LOADING}
            isWide
            onClicked={async () => {
              await submitFormHandler();
            }}
            disabled={!isFormFilled()}
            title={"Create Report"}
          />
        </div>
      </div>
    </div>
  );
}
