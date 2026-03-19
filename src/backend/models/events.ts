import {
  FetchMultiDataRequest,
  FetchMultiDataResponse,
  FilterDataRequest,
  SuccessMessageResponse,
} from "./_shared";

export enum EventTypeEnum {
  VIRTUAL = "virtual",
  IN_PERSON = "in-person",
  HYBRID = "hybrid",
}
export type EventTypeEnumType = keyof typeof EventTypeEnum;
export const EventTypeEnumValues = Object.values(EventTypeEnum);

export interface CreateEventSchema {
  title: string;
  titleSearch: string;
  description: string;
  location: string;
  date: string;
  type: string;
  content: string;
  imgUrl?: string | null;
  registrationUrl?: string | null;
}

export interface CreateEventWithFileSchema {
  data: CreateEventSchema;
  file: File;
}

export interface EventSchema extends CreateEventSchema {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetEventsSchema extends FetchMultiDataRequest {}

export interface UpdateEventSchema extends Partial<CreateEventSchema> {}

export interface UpdateEventWithFileSchema {
  id: string;
  data: UpdateEventSchema;
  file: File | null;
}

export interface FilterEventsSchema extends FilterDataRequest {
  titleSearch?: string;
  type?: string;
}

export interface ResponseEventSchema extends SuccessMessageResponse {
  data: EventSchema;
}

export interface ListResponseEventsSchema extends FetchMultiDataResponse {
  data: EventSchema[];
}
