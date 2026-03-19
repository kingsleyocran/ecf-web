import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export interface ReportSchema {
  id: string;
  title: string;
  titleSearch: string;
  description: string;
  coverImgUrl?: string | null;
  pdfUrl: string;
  publishedDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReportSchema {
  title: string;
  titleSearch: string;
  description: string;
  publishedDate: string;
  isActive: boolean;
  coverImgUrl?: string | null;
  pdfUrl?: string | null;
}

export interface CreateReportWithFilesSchema {
  data: CreateReportSchema;
  coverFile: File;
  pdfFile: File;
}

export interface UpdateReportSchema extends Partial<CreateReportSchema> {}

export interface UpdateReportWithFilesSchema {
  id: string;
  data: UpdateReportSchema;
  coverFile: File | null;
  pdfFile: File | null;
}

export interface GetReportsSchema extends FetchMultiDataRequest {}

export interface FilterReportsSchema extends FilterDataRequest {
  titleSearch?: string;
}

export interface ResponseReportSchema extends SuccessMessageResponse {
  data: ReportSchema;
}

export interface ListResponseReportsSchema extends FetchMultiDataResponse {
  data: ReportSchema[];
}
