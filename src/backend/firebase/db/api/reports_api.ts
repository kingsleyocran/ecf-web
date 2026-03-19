import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/reports";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

// Constants
const dbCollectionName = "reports";
const dbCollection = collection(db, dbCollectionName);
const storageCoverPath = `images/reports`;
const storagePdfPath = `documents/reports`;

function mapDoc(d: any): schemas.ReportSchema {
  return {
    id: d.id,
    ...d.data(),
    createdAt:
      d.data().createdAt instanceof Timestamp
        ? d.data().createdAt.toDate()
        : d.data().createdAt,
    updatedAt:
      d.data().updatedAt instanceof Timestamp
        ? d.data().updatedAt.toDate()
        : d.data().updatedAt,
  } as schemas.ReportSchema;
}

/**
 * Filter reports based on various criteria.
 */
export async function filterReportsApi(
  requestData: schemas.FilterReportsSchema
): Promise<
  [Error | schemas.ListResponseReportsSchema | string, ResponseIndicatorValues]
> {
  try {
    let q = buildFirestoreQuery(requestData, dbCollection);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return [
        {
          data: [],
          recordsCount: 0,
          message: "No records returned",
        } as schemas.ListResponseReportsSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.ReportSchema[] = querySnapshot.docs.map(mapDoc);

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "reports fetched",
        } as schemas.ListResponseReportsSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get all active reports (used by public pages via SSR).
 */
export async function getReportsApi(): Promise<
  [Error | schemas.ListResponseReportsSchema | string, ResponseIndicatorValues]
> {
  try {
    const q = buildFirestoreQuery(
      { orderBy: "createdAt", orderDirection: "desc" },
      dbCollection
    );
    const snap = await getDocs(q);
    return [
      {
        data: snap.docs.map(mapDoc),
        recordsCount: snap.docs.length,
        message: "Reports fetched",
      },
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a single report by ID.
 */
export async function getReportApi(
  id: string
): Promise<
  [Error | schemas.ResponseReportSchema | string, ResponseIndicatorValues]
> {
  try {
    const docSnap = await getDoc(doc(db, dbCollectionName, id));
    if (docSnap.exists()) {
      return [
        {
          data: mapDoc(docSnap),
          message: "Report fetched successfully",
        } as schemas.ResponseReportSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
    return errorHandler({ message: "No such report found!" });
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Create a new report (cover image + PDF document).
 */
export async function createReportApi(
  requestData: schemas.CreateReportWithFilesSchema
): Promise<
  [Error | schemas.ResponseReportSchema | string, ResponseIndicatorValues]
> {
  try {
    let coverImgUrl = "";
    let pdfUrl = "";
    let id = uuidv4();

    if (requestData.coverFile) {
      coverImgUrl = await uploadFile({
        file: requestData.coverFile,
        fileID: id,
        folderPath: storageCoverPath,
      });
    }

    if (requestData.pdfFile) {
      pdfUrl = await uploadFile({
        file: requestData.pdfFile,
        fileID: `${id}-pdf`,
        folderPath: storagePdfPath,
      });
    }

    const newData: Omit<
      schemas.ReportSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      coverImgUrl: coverImgUrl || (requestData.data.coverImgUrl ?? null),
      pdfUrl: pdfUrl || (requestData.data.pdfUrl ?? ""),
      isActive: requestData.data.isActive ?? true,
    };

    const response = await runTransaction(db, async (transaction) => {
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const newDocRef = doc(db, dbCollectionName, id);
      const newDocData = {
        ...newData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      transaction.set(newDocRef, newDocData);

      transaction.update(dbInfoAggregatorRef, {
        reports: (dbInfoAggregatorDoc.data().reports ?? 0) + 1,
      });

      transaction.update(dbInfoSitemapRef, {
        reportIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New report created successfully",
      } as schemas.ResponseReportSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Update an existing report.
 */
export async function updateReportApi(
  requestData: schemas.UpdateReportWithFilesSchema
): Promise<
  [Error | schemas.ResponseReportSchema | string, ResponseIndicatorValues]
> {
  try {
    let coverImgUrl = requestData.data.coverImgUrl || "";
    let pdfUrl = requestData.data.pdfUrl || "";
    let id = requestData.id;

    if (requestData.coverFile) {
      coverImgUrl = await uploadFile({
        file: requestData.coverFile,
        fileID: id,
        folderPath: storageCoverPath,
      });
    }

    if (requestData.pdfFile) {
      pdfUrl = await uploadFile({
        file: requestData.pdfFile,
        fileID: `${id}-pdf`,
        folderPath: storagePdfPath,
      });
    }

    const updatedData: Omit<
      schemas.UpdateReportSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      coverImgUrl: coverImgUrl,
      pdfUrl: pdfUrl,
    };

    const response = await runTransaction(db, async (transaction) => {
      const docRef = doc(db, dbCollectionName, id);
      const updatedDocData = {
        ...updatedData,
        updatedAt: new Date(),
      };
      transaction.update(docRef, updatedDocData);
      return updatedDocData;
    });

    return [
      {
        data: response,
        message: "Report updated successfully",
      } as schemas.ResponseReportSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Delete a report by ID.
 */
export async function deleteReportApi(
  data: schemas.ReportSchema
): Promise<
  [Error | schemas.ResponseReportSchema | string, ResponseIndicatorValues]
> {
  try {
    const response = await runTransaction(db, async (transaction) => {
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const docRef = doc(db, dbCollectionName, data.id);

      if (data.coverImgUrl) {
        await deleteFile({ objectUrl: data.coverImgUrl });
      }
      if (data.pdfUrl) {
        await deleteFile({ objectUrl: data.pdfUrl });
      }

      transaction.delete(docRef);

      transaction.update(dbInfoAggregatorRef, {
        reports: (dbInfoAggregatorDoc.data().reports ?? 1) - 1,
      });

      transaction.update(dbInfoSitemapRef, {
        reportIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Report deleted successfully.",
      } as schemas.ResponseReportSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
