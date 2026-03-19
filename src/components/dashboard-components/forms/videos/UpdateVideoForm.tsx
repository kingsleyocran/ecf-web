import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  MediaTypeEnumValues,
  VideoSchema,
  UpdateVideoSchema,
  UpdateVideoWithFileSchema,
} from "@/backend/models/videos";
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

type FormFieldNames = keyof UpdateVideoSchema;
type Props = {
  data: VideoSchema;
  disableDelete?: boolean;
  dashboardModalRef: RefObject<_DashboardFormModalBaseRef>;
};

export default function UpdateVideoForm({
  data,
  dashboardModalRef,
  disableDelete = false,
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

  const onChangeHandler = (fieldName: FormFieldNames, value: any) => {
    setFormState((prevFormState: any) => ({
      ...prevFormState,
      [fieldName]: value,
    }));
  };

  const isFormFilled = () => {
    const { id, imgUrl, createdAt, updatedAt, titleSearch, ...rest } = formState;
    return Object.values(rest).every((value) => value !== null);
  };

  async function editHandler() {
    if (!isFormFilled()) return;
    setEditIsLoading(true);

    try {
      const request: UpdateVideoWithFileSchema = {
        id: data.id,
        data: {
          title: formState.title,
          titleSearch: formState.title.toLowerCase(),
          description: formState.description,
          link: formState.link,
          type: formState.type,
          imgUrl: formState.imgUrl,
        },
        file: selectedFile,
      };

      await dispatch(
        videosRedux.actions.updateVideoAsync({ data: request })
      ).then(async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Video/Podcast has been updated",
          });
          dispatch(videosRedux.actions.fetchVideoWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error updating the video/podcast",
          });
        }

        setEditIsLoading(false);
      });

      return request;
    } catch (error) {
      console.error("Error updating video/podcast:", error);
      ErrorToast({
        message: "There was an error updating your video/podcast",
      });
      setEditIsLoading(false);
    }
  }

  async function deleteHandler() {
    setDeleteIsLoading(true);
    await dispatch(videosRedux.actions.deleteVideoAsync(data)).then(
      async (responseData: any) => {
        if (responseData.meta.requestStatus === "fulfilled") {
          SuccessToast({
            message: "Video/Podcast deleted",
          });
          dispatch(videosRedux.actions.fetchVideoWithFilters());
          dashboardModalRef.current!.closeModal();
        } else if (responseData.meta.requestStatus === "rejected") {
          ErrorToast({
            message: "There was an error deleting video/podcast",
          });
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
            title={"Update Video/Podcast"}
          />
        </div>
      </div>
    </div>
  );
}
