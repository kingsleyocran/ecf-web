import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export interface CreateNewsletterSchema {
  title: string;
  titleSearch: string;
  description: string;
  content: string;
  imgUrl?: string | null;
}

export interface CreateNewsletterWithFileSchema {
  data: CreateNewsletterSchema;
  file: File;
}

export interface NewsletterSchema extends CreateNewsletterSchema {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetNewslettersSchema extends FetchMultiDataRequest {}

export interface UpdateNewsletterSchema extends Partial<CreateNewsletterSchema> {}

export interface UpdateNewsletterWithFileSchema {
  id: string;
  data: UpdateNewsletterSchema;
  file: File | null;
}

export interface FilterNewslettersSchema extends FilterDataRequest {
  titleSearch?: string;
}

export interface ResponseNewsletterSchema extends SuccessMessageResponse {
  data: NewsletterSchema;
}

export interface ListResponseNewslettersSchema extends FetchMultiDataResponse {
  data: NewsletterSchema[];
}
