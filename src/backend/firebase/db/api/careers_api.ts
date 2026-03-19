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
import * as schemas from "../../../models/careers";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

// Constants
const dbCollectionName = "careers";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/careers`;

/**
 * Filter careers based on various criteria.
 * @param {FilterCareersSchema} requestData - Request Data
 * @returns {Promise} Response: [ListResponseCareersSchema, ResponseIndicator.SUCCESS]
 */
export async function filterCareersApi(
  requestData: schemas.FilterCareersSchema
): Promise<
  [Error | schemas.ListResponseCareersSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseCareersSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.CareerSchema[] = [];
      querySnapshot.forEach((doc) => {
        response.push({
          id: doc.id,
          ...doc.data(),
          updatedAt:
            doc.data().updatedAt instanceof Timestamp
              ? doc.data().updatedAt.toDate()
              : doc.data().updatedAt,
          createdAt:
            doc.data().createdAt instanceof Timestamp
              ? doc.data().createdAt.toDate()
              : doc.data().createdAt,
        } as schemas.CareerSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "Careers fetched",
        } as schemas.ListResponseCareersSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Create a new career.
 * @param {CreateCareerWithFileSchema} requestData - Request Data to create a career.
 * @returns {Promise} Response: [ResponseCareerSchema, ResponseIndicator.SUCCESS]
 */
export async function createCareerApi(
  requestData: schemas.CreateCareerWithFileSchema
): Promise<
  [Error | schemas.ResponseCareerSchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = "";
    let id = uuidv4();
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id,
        folderPath: storageFilePath,
      });
    }

    const newData: Omit<schemas.CareerSchema, "id" | "createdAt" | "updatedAt"> =
      {
        ...requestData.data,
        imgUrl: imgUrl || (requestData.data.imgUrl ?? null),
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
        careers: (dbInfoAggregatorDoc.data().careers || 0) + 1,
      });

      transaction.update(dbInfoSitemapRef, {
        careerIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New career created successfully",
      } as schemas.ResponseCareerSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Update an existing career.
 * @param {UpdateCareerWithFileSchema} requestData - Request Data to update a career.
 * @returns {Promise} Response: [ResponseCareerSchema, ResponseIndicator.SUCCESS]
 */
export async function updateCareerApi(
  requestData: schemas.UpdateCareerWithFileSchema
): Promise<
  [Error | schemas.ResponseCareerSchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = requestData.data.imgUrl || "";
    let id = requestData.id;

    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id,
        folderPath: storageFilePath,
      });
    }

    const updatedData: Omit<
      schemas.UpdateCareerSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl,
    };

    const response = await runTransaction(db, async (transaction) => {
      const memberDocRef = doc(db, dbCollectionName, id);

      const updatedDocData = {
        ...updatedData,
        updatedAt: new Date(),
      };

      transaction.update(memberDocRef, updatedDocData);
      return updatedDocData;
    });

    return [
      {
        data: response,
        message: "Career updated successfully",
      } as schemas.ResponseCareerSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a career by ID.
 * @param {string} id - ID.
 * @returns {Promise} Response: [ResponseCareerSchema, ResponseIndicator.SUCCESS]
 */
export async function getCareerApi(
  id: string
): Promise<
  [Error | schemas.ResponseCareerSchema | string, ResponseIndicatorValues]
> {
  try {
    const docRef = doc(db, dbCollectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return [
        {
          data: {
            id: docSnap.id,
            ...docSnap.data(),
            updatedAt:
              docSnap.data().updatedAt instanceof Timestamp
                ? docSnap.data().updatedAt.toDate()
                : docSnap.data().updatedAt,
            createdAt:
              docSnap.data().createdAt instanceof Timestamp
                ? docSnap.data().createdAt.toDate()
                : docSnap.data().createdAt,
          },
          message: "Career fetched successfully",
        } as schemas.ResponseCareerSchema,
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
 * Delete a career by ID
 * @param {CareerSchema} data - Data of the career
 * @returns {Promise} Response: [ResponseCareerSchema, ResponseIndicator.SUCCESS]
 */
export async function deleteCareerApi(
  data: schemas.CareerSchema
): Promise<
  [Error | schemas.ResponseCareerSchema | string, ResponseIndicatorValues]
> {
  try {
    const response = await runTransaction(db, async (transaction) => {
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const docRef = doc(db, dbCollectionName, data.id);

      if (data.imgUrl) {
        await deleteFile({ objectUrl: data.imgUrl });
      }

      transaction.delete(docRef);

      transaction.update(dbInfoAggregatorRef, {
        careers: (dbInfoAggregatorDoc.data().careers || 1) - 1,
      });

      transaction.update(dbInfoSitemapRef, {
        careerIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Career deleted successfully.",
      } as schemas.ResponseCareerSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
