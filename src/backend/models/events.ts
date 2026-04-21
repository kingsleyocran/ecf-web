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
  date: string;                    // Display string: "April 12, 2026"
  startDateTime?: string | null;   // UTC ISO: "2026-04-12T13:00:00.000Z"
  timezone?: string | null;        // IANA name: "Africa/Lagos", "GMT", etc.
  type: string;
  content?: string | null;
  imgUrl?: string | null;
  registrationUrl?: string | null;
  virtualLink?: string | null;     // Join link — shown when event has started
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
