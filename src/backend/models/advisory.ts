import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

// Advisorys
export interface CreateAdvisorySchema {
  name: string;
  nameSearch: string;
  bio: string | null;
  imgUrl?: string | null;
}

export interface CreateAdvisoryWithFileSchema {
  data: CreateAdvisorySchema;
  file: File;
}

export interface AdvisorySchema extends CreateAdvisorySchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface GetAdvisorysSchema extends FetchMultiDataRequest {}

export interface UpdateAdvisorySchema
  extends Partial<CreateAdvisorySchema> {}

export interface UpdateAdvisoryWithFileSchema {
  id: string;
    data: UpdateAdvisorySchema;
    file: File | null;
  }

export interface FilterAdvisorysSchema extends FilterDataRequest {
  nameSearch?: string;
}

export interface ResponseAdvisorySchema extends SuccessMessageResponse {
  data: AdvisorySchema;
}

export interface ListResponseAdvisorysSchema
  extends FetchMultiDataResponse {
  data: AdvisorySchema[];
}



