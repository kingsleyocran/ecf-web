import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseClient";
import * as schemas from "@/backend/models/_dbInfo";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { errorHandler } from "./_base";

const dbCollectionName = "db_info";
const aggregatorID = "aggregators";
const sitemapID = "sitemap";
export const dbInfoAggregatorRef = doc(db, dbCollectionName, aggregatorID);
export const dbInfoSitemapRef = doc(db, dbCollectionName, sitemapID);

/**
 * Get aggregators from db_info.
 * @returns {Promise} Response: [ResponseDBInfoAggregatorSchema, ResponseIndicator.SUCCESS]
 */
export async function getDBInfoAggregator(): Promise<
  [
    Error | schemas.ResponseDBInfoAggregatorSchema | string,
    ResponseIndicatorValues
  ]
> {
  try {
    const docRef = doc(db, dbCollectionName, aggregatorID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return [
        {
          data: { ...docSnap.data() },
          message: "DBInfo aggregators fetched successfully",
        } as schemas.ResponseDBInfoAggregatorSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such data found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}


/**
 * Get sitemap from db_info.
 * @returns {Promise} Response: [ResponseDBInfoAggregatorSchema, ResponseIndicator.SUCCESS]
 */
export async function getDBInfoSitemap(): Promise<
  [
    Error | schemas.ResponseDBInfoSiteMapSchema | string,
    ResponseIndicatorValues
  ]
> {
  try {
    const docRef = doc(db, dbCollectionName, sitemapID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return [
        {
          data: { ...docSnap.data() },
          message: "DBInfo sitemap fetched successfully",
        } as schemas.ResponseDBInfoSiteMapSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such data found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}