export interface ArticleSchema {
  id: string;
  title: string;
  description: string;
  author: string;
  content: string;
  imgUrl?: string | null;
  publishedDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseArticleSchema {
  data: ArticleSchema;
  message: string;
}

export interface ListResponseArticlesSchema {
  data: ArticleSchema[];
  message: string;
}
