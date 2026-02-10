import { SuccessMessageResponse } from "./_shared";

export interface DBInfoAggregatorSchema {
  blogs: number;
  team: number;
  advisoryCircle: number;
}

export interface ResponseDBInfoAggregatorSchema extends SuccessMessageResponse {
  data: DBInfoAggregatorSchema;
}


export interface DBInfoSiteMapSchema {
  blogIDs: string[];
  seriesIDs: string[];
}

export interface ResponseDBInfoSiteMapSchema extends SuccessMessageResponse {
  data: DBInfoSiteMapSchema;
}
