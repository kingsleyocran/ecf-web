import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export enum MediaTypeEnum {
  YOUTUBE_VIDEO = "youtube-video",
  SPOTIFY_PODCAST = "spotify-podcast",
}
export type MediaTypeEnumType = keyof typeof MediaTypeEnum;
export const MediaTypeEnumValues = Object.values(MediaTypeEnum);

// Videos
export interface CreateVideoSchema {
  title: string;
  titleSearch: string;
  description: string;
  link: string;
  type: MediaTypeEnumType;
  imgUrl?: string | null;
}

export interface CreateVideoWithFileSchema {
  data: CreateVideoSchema;
  file: File;
}

export interface VideoSchema extends CreateVideoSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetVideosSchema extends FetchMultiDataRequest {}

export interface UpdateVideoSchema extends Partial<CreateVideoSchema> {}

export interface UpdateVideoWithFileSchema {
  id: string;
  data: UpdateVideoSchema;
  file: File | null;
}

export interface FilterVideosSchema extends FilterDataRequest {
  titleSearch?: string;
  type?: string;
}

export interface ResponseVideoSchema extends SuccessMessageResponse {
  data: VideoSchema;
}

export interface ListResponseVideosSchema extends FetchMultiDataResponse {
  data: VideoSchema[];
}
