import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export interface CreateArticleSchema {
  name: string;
  nameSearch: string;
  content: string;
  author: string;
  description: string;
  imgUrl?: string | null;
}

export interface CreateArticleWithFileSchema {
  data: CreateArticleSchema;
  file: File;
}

export interface ArticleSchema extends CreateArticleSchema {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetArticlesSchema extends FetchMultiDataRequest {}

export interface UpdateArticleSchema extends Partial<CreateArticleSchema> {}

export interface UpdateArticleWithFileSchema {
  id: string;
  data: UpdateArticleSchema;
  file: File | null;
}

export interface FilterArticlesSchema extends FilterDataRequest {
  nameSearch?: string;
}

export interface ResponseArticleSchema extends SuccessMessageResponse {
  data: ArticleSchema;
}

export interface ListResponseArticlesSchema extends FetchMultiDataResponse {
  data: ArticleSchema[];
}
