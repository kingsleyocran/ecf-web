import { QueryDocumentSnapshot } from "firebase/firestore";

export enum SexEnum {
  MALE = "M",
  FEMALE = "F",
  OTHER = "O",
}
export type SexEnumValues = `${SexEnum}`;

export enum ComponentStateEnum {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
  DISABLED = "disabled",
}
export type ComponentStateEnumValues = `${ComponentStateEnum}`;

export type DropDownSelectItem = {
  id: string | number | boolean | null;
  name: string;
};

export enum ProfessionEnum {
  WRITER = "Author / Writer",
  CULTURAL_ORGANIZER = "Cultural Organizer",
  CURATOR = "Curator / Programmer",
  DIRECTOR = "Director",
  EDITOR = "Editor",
  HOST = "Host",
  JOURNALIST = "Journalist",
  PRODUCER = "Producer",
  IMPACT_PRODUCER = "Impact Producer",
  OTHER = "Other",
}
export const ProfessionEnumList: string[] = Object.values(ProfessionEnum);
export type ProfessionEnumValues = `${ProfessionEnum}`;

export enum MediumsEnum {
  ANIMATION = "Animation",
  ARVR = "AR/VR",
  BOOK = "Book",
  EPISODIC = "Episodic",
  FEATURE_LENGTH = "Feature Length",
  GRAPHIC_ART = "Graphic Art",
  SHORT_FORM = "Short Form",
  PODCAST = "Podcast/Radio",
  OTHER = "Other",
}
export const MediumsEnumList: string[] = Object.values(MediumsEnum);
export type MediumsEnumValues = `${MediumsEnum}`;

export enum EventTypeEnum {
  CONFERENCE = "Conference",
  FESTIVAL = "Festival",
  WORKSHOP = "Workshop",
  WEBINAR = "Webinar",
  MEETUP = "Meetup",
  MASTERCLASS = "Masterclass",
  OTHER = "Other",
}
export const EventTypeList: string[] = Object.values(EventTypeEnum);
export type EventTypeEnumValues = `${EventTypeEnum}`;

export enum ResourceLabelEnum {
  TOOLS = "Tools",
  FUNDING = "Funds",
  READINGS = "Readings",
  OTHER = "Other",
}
export const ResourceLabelEnumList: string[] = Object.values(ResourceLabelEnum);
export type ResourceLabelEnumValues = `${ResourceLabelEnum}`;

export type MessageResponse = {
  message: string;
};

export interface ErrorResponse {
  detail: string;
  error_type: string;
}

export enum ResponseIndicator {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
export type ResponseIndicatorValues = `${ResponseIndicator}`;

export enum OrderDirectionEnum {
  ASC = "asc",
  DESC = "desc",
}

export type OrderDirectionEnumValues = `${OrderDirectionEnum}`;

export enum BooleanEnum {
  TRUE = "true",
  FALSE = "false",
}

export type BooleanEnumValues = `${BooleanEnum}`;

export type DateTimeRangeType = [Date, Date] | null;
export function isDateTimeRangeType(value: any): value is DateTimeRangeType {
  if (value === null) {
    return true;
  }

  if (Array.isArray(value) && value.length === 2) {
    return value[0] instanceof Date && value[1] instanceof Date;
  }

  return false;
}

export const fetchListDefaultResponse = {
  data: [],
  recordsCount: 0,
  message: "",
  lastDoc: undefined,
};

// MULTI DATA FETCH
export const PaginationFilterDefault: PaginationFilterSchema = {
  startAfterDocQueue: [],
  limit: 24,
};

export interface PaginationFilterSchema {
  startAfterDocQueue?: QueryDocumentSnapshot[];
  limit?: number;
}

export interface SortingFilterSchema {
  orderBy?: string;
  orderDirection?: OrderDirectionEnumValues;
}

export interface FetchMultiDataRequest extends PaginationFilterSchema {}

export interface FilterDataRequest
  extends PaginationFilterSchema,
    SortingFilterSchema {
  createdAtRange?: DateTimeRangeType | string | [string, string];
  updatedAtRange?: DateTimeRangeType | string | [string, string];
}

export const FiltersDefault: FilterDataRequest = {
  orderBy: "updatedAt",
  orderDirection: "desc",
  startAfterDocQueue: [],
  limit: 24,
};

export interface SuccessMessageResponse extends MessageResponse {}

export interface FetchMultiDataResponse {
  message: string;
  recordsCount: number;
  lastDoc?: QueryDocumentSnapshot;
}

export interface locationLatLng {
  name: string | null;
  longitude: number | null;
  latitude: number | null;
}

// FAQ
export interface CreateFAQModel {
  question: string;
  answer: string;
}

export interface FAQModel extends CreateFAQModel {
  id: string;
  dateCreated: any;
}

export interface ResponseAggregatorSchema extends SuccessMessageResponse {
  data: number;
}
