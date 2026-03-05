export interface NewsletterSchema {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  imgUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListResponseNewslettersSchema {
  data: NewsletterSchema[];
  message: string;
}
