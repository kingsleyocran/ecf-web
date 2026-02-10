import React, { RefObject, useEffect, useRef, useState, useCallback } from "react";
import {
  CreateAdvisorySchema,
  CreateAdvisoryWithFileSchema,
} from "@/backend/models/advisory";
import {
  ComponentStateEnum,
  ComponentStateEnumValues,
} from "@/backend/models/_shared";
import { useAppDispatch } from "@/redux/app/hooks";
import * as advisoryRedux from "@/redux/features/advisoryCircle";
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

type CreateAdvisoryModalProps = {};
export function CreateAdvisoryModal({}: CreateAdvisoryModalProps) {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase ref={modalRef} buttonTitle={"Create new"}>
      <CreateAdvisoryForm data={null} dashboardModalRef={modalRef} />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof CreateAdvisorySchema;
type Props = {
  data?: any;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function CreateAdvisoryForm({ data, dashboardModalRef }: Props) {
  const initialFormState = {
    name: null,
    portfolio: null,
    bio: null,
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
    const { name } = formState;
    return name;
  }, [formState]);

  // Function to handle the form submission with preventDefault
  async function submitFormHandler() {
    if (!isFormFilled()) return;
    setComponentState(ComponentStateEnum.LOADING);

    const request: CreateAdvisoryWithFileSchema = {
      data: {
        name: formState.name,
        nameSearch: formState.name.toLowerCase(),
        bio: formState.bio,
        imgUrl: null,
      },
      file: selectedFile!,
    };

    await dispatch(
      advisoryRedux.actions.createAdvisoryAsync({
        data: request,
      })
    ).then(async (responseData: any) => {
      if (responseData.meta.requestStatus === "fulfilled") {
        SuccessToast({
          message: "Your advisory circle member was sent successfully",
        });

        resetFormState();
        dispatch(advisoryRedux.actions.fetchAdvisorysWithFilters());
        dashboardModalRef.current!.closeModal();
      } else if (responseData.meta.requestStatus === "rejected") {
        ErrorToast({
          message: "There was an error uploading your advisory circle member",
        });
      }
      setComponentState(ComponentStateEnum.DISABLED);
    });

    return request;
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
  }, [formState]);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 p-8 mx-12 flex flex-col gap-4 h-full overflow-y-scroll
      bg-neutral-200 rounded-xl md:p-8 "
      >
        <form action="" className="   flex flex-col gap-8">
          <ImageUploadComponent
            isRequired={true}
            ref={imageUploadRef}
            labelText="Please upload image"
            maxFileSize={5 * 1024 * 1024} // 5 MB file size limit
            maxOutputSize={5 * 1024 * 1024} // 600 KB resized output limit
            onImageUpload={handleImageUpload} // Callback for the uploaded image
            placeholderText="Attach file (Should be a PNG/JPG with size below 5MB)"
            isCircular={false}
            sizeHW="h-300 w-300"
          />

          <TextInput
            validationRegex={/^.{3,}$/}
            onInputChange={(val: any) => onChangeHandler("name", val)}
            value={formState.name}
            placeholderText="Enter name"
            labelText="Name"
          />

          <TextArea
            isRequired={false}
            onInputChange={(val: any) => onChangeHandler("bio", val)}
            value={formState.bio}
            maxLength={3000}
            placeholderText="Add bio"
            labelText="Bio"
          />
        </form>
      </div>

      <div
        className="h-[70px] w-full px-4 flex flex-row items-center
      justify-center"
      >
        {/* Approve Button */}
        <DashboardButton
          isLoading={componentState === ComponentStateEnum.LOADING}
          isWide={false}
          onClicked={async () => {
            await submitFormHandler();
          }}
          disabled={!isFormFilled()}
          title={"Create member"}
        />
      </div>
    </div>
  );
}
