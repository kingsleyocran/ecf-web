import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export interface CreateOpEdSchema {
  name: string;
  nameSearch: string;
  content: string;
  author: string;
  description: string;
  imgUrl?: string | null;
}

export interface CreateOpEdWithFileSchema {
  data: CreateOpEdSchema;
  file: File;
}

export interface OpEdSchema extends CreateOpEdSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetOpedsSchema extends FetchMultiDataRequest {}

export interface UpdateOpEdSchema extends Partial<CreateOpEdSchema> {}

export interface UpdateOpEdWithFileSchema {
  id: string;
  data: UpdateOpEdSchema;
  file: File | null;
}

export interface FilterOpedsSchema extends FilterDataRequest {
  nameSearch?: string;
}

export interface ResponseOpEdSchema extends SuccessMessageResponse {
  data: OpEdSchema;
}

export interface ListResponseOpedsSchema extends FetchMultiDataResponse {
  data: OpEdSchema[];
}
