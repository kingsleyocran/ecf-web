import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export enum CareerTypeEnum {
  FELLOWSHIP = "fellowship",
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  CONTRACT = "contract",
  INTERNSHIP = "internship",
}
export type CareerTypeEnumType = keyof typeof CareerTypeEnum;
export const CareerTypeEnumValues = Object.values(CareerTypeEnum);

// Careers
export interface CreateCareerSchema {
  title: string;
  titleSearch: string;
  content: string;
  description: string;
  location: string;
  type: CareerTypeEnumType;
  applyUrl?: string | null;
  imgUrl?: string | null;
  isActive: boolean;
}

export interface CreateCareerWithFileSchema {
  data: CreateCareerSchema;
  file: File;
}

export interface CareerSchema extends CreateCareerSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCareersSchema extends FetchMultiDataRequest {}

export interface UpdateCareerSchema extends Partial<CreateCareerSchema> {}

export interface UpdateCareerWithFileSchema {
  id: string;
  data: UpdateCareerSchema;
  file: File | null;
}

export interface FilterCareersSchema extends FilterDataRequest {
  titleSearch?: string;
  type?: string;
}

export interface ResponseCareerSchema extends SuccessMessageResponse {
  data: CareerSchema;
}

export interface ListResponseCareersSchema extends FetchMultiDataResponse {
  data: CareerSchema[];
}
