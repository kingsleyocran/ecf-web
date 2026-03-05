export interface CareerSchema {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  content: string;
  imgUrl?: string | null;
  applyUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseCareerSchema {
  data: CareerSchema;
  message: string;
}

export interface ListResponseCareersSchema {
  data: CareerSchema[];
  message: string;
}
