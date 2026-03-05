export interface ReportSchema {
  id: string;
  title: string;
  description: string;
  coverImgUrl?: string | null;
  pdfUrl: string;
  publishedDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseReportSchema {
  data: ReportSchema;
  message: string;
}

export interface ListResponseReportsSchema {
  data: ReportSchema[];
  message: string;
}
