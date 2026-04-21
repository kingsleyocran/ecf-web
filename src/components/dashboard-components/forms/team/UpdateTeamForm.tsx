import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  TeamMemberSchema,
  UpdateTeamMemberSchema,
  UpdateTeamMemberWithFileSchema,
} from "@/backend/models/team";
import { useAppDispatch } from "@/redux/app/hooks";
import * as teamRedux from "@/redux/features/team";
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

type UpdateSeriesModalProps = {
  data: TeamMemberSchema;
  updateStorageProfileData: boolean;
  disableDelete: boolean;
};
export function UpdateTeamModal({
  data,
  updateStorageProfileData,
  disableDelete,
}: UpdateSeriesModalProps) {
  const modalRef = useRef<_DashboardFormModalBaseRef>(null);
  return (
    <_DashboardFormModalBase ref={modalRef} buttonTitle={"Update Profile"}>
      <UpdateTeamForm
        data={data}
        dashboardModalRef={modalRef}
        updateStorageProfileData={updateStorageProfileData}
        disableDelete={disableDelete}
      />
    </_DashboardFormModalBase>
  );
}

type FormFieldNames = keyof UpdateTeamMemberSchema;
type Props = {
  data: TeamMemberSchema;
  updateStorageProfileData?: boolean;
  disableDelete?: boolean;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};
export default function UpdateTeamForm({
  data,
  dashboardModalRef,
  disableDelete = false,
  updateStorageProfileData = false,
}: Props) {
  const initialFormState = {
    ...data,
  };

  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const imageUploadRef = useRef<ImageUploadComponentRef>(null);
  const [formState, setFormState] = useState<any>(initialFormState);
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
  const isFormFilled = () => {
    const { name } = formState;
    return name !== null;
  };

  // Function to handle the form submission with preventDefault
  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    const request: UpdateTeamMemberWithFileSchema = {
      id: data.id,
      data: {
        name: formState.name,
        nameSearch: formState.name.toLowerCase(),
        portfolio: formState.portfolio,
        linkedinUrl: formState.linkedinUrl || null,
        bio: formState.bio,
        imgUrl: formState.imgUrl,
      },
      file: selectedFile,
    };

    await dispatch(
      teamRedux.actions.updateTeamMemberAsync({ data: request })
    ).then(async (responseData: any) => {
      if (responseData.meta.requestStatus === "fulfilled") {
        SuccessToast({
          message: "Team member has been updated",
        });
        dispatch(teamRedux.actions.fetchTeamMembersWithFilters());
        dashboardModalRef.current!.closeModal();
      } else if (responseData.meta.requestStatus === "rejected") {
        ErrorToast({
          message: "There was an error updating the team member",
        });
      }

      setEditIsLoading(true);
    });

    return request;
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(teamRedux.actions.deleteTeamMemberAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Team member deleted",
          });
          dispatch(teamRedux.actions.fetchTeamMembersWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error deleting team member",
          });
        }
        setDeleteIsLoading(false);
      }
    );
  }

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
      <div className="flex-1 p-8 mx-12 mb-6 flex flex-col gap-4 h-full overflow-y-scroll bg-neutral-200 rounded-xl  md:p-8 ">
        <form action="" className="   flex flex-col gap-8">
          <ImageUploadComponent
            isRequired={false}
            ref={imageUploadRef}
            labelText="Please upload your headshot"
            maxFileSize={5 * 1024 * 1024} // 5 MB file size limit
            maxOutputSize={600 * 1024} // 600 KB resized output limit
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

          <TextInput
            isRequired={false}
            validationRegex={/^.{3,}$/}
            onInputChange={(val: any) => onChangeHandler("portfolio", val)}
            value={formState.portfolio}
            placeholderText="Enter portfolio"
            labelText="Portfolio"
          />

          <TextInput
            isRequired={false}
            validationRegex={/^.{0,}$/}
            onInputChange={(val: any) => onChangeHandler("linkedinUrl", val)}
            value={formState.linkedinUrl}
            placeholderText="https://linkedin.com/in/..."
            labelText="LinkedIn URL (optional)"
          />

          <TextArea
            isRequired={false}
            onInputChange={(val: any) => onChangeHandler("bio", val)}
            value={formState.bio}
            maxLength={5000}
            placeholderText="Add bio"
            labelText="Bio"
          />
        </form>
      </div>

      <div
        className={`h-[60px] border-t-[0.5px] w-full px-4 flex flex-row items-center
      ${!disableDelete ? "justify-between" : "justify-center"}`}
      >
        {/* Delete Button */}
        {!disableDelete && (
          <DashboardButton
            isLoading={deleteIsLoading}
            isWide={false}
            onClicked={async () => {
              await deleteHandler();
            }}
            title={"Delete"}
            buttonColor="#dc2626"
          />
        )}

        {/* Edit Button */}
        <DashboardButton
          isLoading={editIsLoading}
          isWide={false}
          onClicked={async () => {
            await editHandler();
          }}
          disabled={!isFormFilled()}
          title={"Update Profile"}
        />
      </div>
    </div>
  );
}
