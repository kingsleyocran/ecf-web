export interface OpEdSchema {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  imgUrl?: string | null;
  publishedDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseOpEdSchema {
  data: OpEdSchema;
  message: string;
}

export interface ListResponseOpedsSchema {
  data: OpEdSchema[];
  message: string;
}
