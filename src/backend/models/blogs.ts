import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export enum BlogEnum{
  AI = "ai",
  CDR = "cdr",
  SRM = "srm",
  NEWS = "news",
}
export type BlogEnumType = keyof typeof BlogEnum;
export const BlogEnumValues = Object.values(BlogEnum);

// Blogs
export interface CreateBlogSchema {
  name: string;
  nameSearch: string;
  content: string;
  author: string;
  description: string;
  type: BlogEnumType;
  imgUrl?: string | null;
}

export interface CreateBlogWithFileSchema {
  data: CreateBlogSchema;
  file: File;
}

export interface BlogSchema extends CreateBlogSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetBlogsSchema extends FetchMultiDataRequest {}

export interface UpdateBlogSchema extends Partial<CreateBlogSchema> {}

export interface UpdateBlogWithFileSchema {
  id: string;
  data: UpdateBlogSchema;
  file: File | null;
}

export interface FilterBlogsSchema extends FilterDataRequest {
  nameSearch?: string;
  type?: string;
}

export interface ResponseBlogSchema extends SuccessMessageResponse {
  data: BlogSchema;
}

export interface ListResponseBlogsSchema extends FetchMultiDataResponse {
  data: BlogSchema[];
}
