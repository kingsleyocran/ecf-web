import { SuccessMessageResponse } from "./_shared";

export interface DBInfoAggregatorSchema {
  blogs: number;
  team: number;
  advisoryCircle: number;
  reports: number;
  newsletters: number;
  articles: number;
  opeds: number;
  videos: number;
  events: number;
  careers: number;
}

export interface ResponseDBInfoAggregatorSchema extends SuccessMessageResponse {
  data: DBInfoAggregatorSchema;
}


export interface DBInfoSiteMapSchema {
  blogIDs: string[];
  seriesIDs: string[];
  eventIDs: string[];
  reportIDs: string[];
  opedIDs: string[];
  articleIDs: string[];
  newsletterIDs: string[];
  videoIDs: string[];
}

export interface ResponseDBInfoSiteMapSchema extends SuccessMessageResponse {
  data: DBInfoSiteMapSchema;
}
