export interface EventSchema {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  type: "virtual" | "in-person" | "hybrid";
  content: string;
  imgUrl?: string | null;
  registrationUrl?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseEventSchema {
  data: EventSchema;
  message: string;
}

export interface ListResponseEventsSchema {
  data: EventSchema[];
  message: string;
}
