import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/advisory";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef } from "../_dbInfo";

// Constants
const dbCollectionName = "advisory-circle";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/advisory-circle`;

/**
 * Filter advisorys based on various criteria.
 * @param {FilterAdvisorysSchema} requestData - Request Data
 * @returns {Promise} Response: [ListResponseAdvisorySchema, ResponseIndicator.SUCCESS]
 */
export async function filterAdvisorysApi(
  requestData: schemas.FilterAdvisorysSchema
): Promise<
  [Error | schemas.ListResponseAdvisorysSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseAdvisorysSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.AdvisorySchema[] = [];
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
        } as schemas.AdvisorySchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "Advisory circle memebers fetched",
        } as schemas.ListResponseAdvisorysSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Create a new advisory.
 * @param {CreateadvisoryWithFileSchema} requestData - Request Data to create an advisory.
 * @returns {Promise} Response: [ResponseAdvisorySchema, ResponseIndicator.SUCCESS]
 */
export async function createAdvisoryApi(
  requestData: schemas.CreateAdvisoryWithFileSchema
): Promise<
  [Error | schemas.ResponseAdvisorySchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = "";
    let id = uuidv4();
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id,
        folderPath: storageFilePath,
      }); // Upload image if provided
    }

    const newMember: Omit<
      schemas.AdvisorySchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl || (requestData.data.imgUrl ?? null),
    };

    const response = await runTransaction(db, async (transaction) => {
      // get stats doc
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const newDocRef = doc(db, dbCollectionName, id);
      const newDocData = {
        ...newMember,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // create new doc
      transaction.set(newDocRef, newDocData);

      // increase aggregator
      transaction.update(dbInfoAggregatorRef, {
        advisoryCircle: dbInfoAggregatorDoc.data().advisoryCircle + 1,
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New advisory circle memeber created successfully",
      } as schemas.ResponseAdvisorySchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Update an existing advisory.
 * @param {UpdateadvisoryWithFileSchema} requestData - Request Data to update a advisory.
 * @returns {Promise} Response: [ResponseAdvisorySchema, ResponseIndicator.SUCCESS]
 */
export async function updateAdvisoryApi(
  requestData: schemas.UpdateAdvisoryWithFileSchema
): Promise<
  [Error | schemas.ResponseAdvisorySchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = requestData.data.imgUrl || "";
    let id = requestData.id;

    // If a new file is provided, upload it and get the new image URL
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id, // Use the existing member ID for the fileID
        folderPath: storageFilePath,
      });
    }

    // Prepare the updated member data
    const updatedMember: Omit<
      schemas.UpdateAdvisorySchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl,
    };

    const response = await runTransaction(db, async (transaction) => {
      // get member doc
      const memberDocRef = doc(db, dbCollectionName, id);

      // update member data
      const updatedDocData = {
        ...updatedMember,
        updatedAt: new Date(), // Keep createdAt unchanged
      };

      transaction.update(memberDocRef, updatedDocData);
      return updatedDocData;
    });

    return [
      {
        data: response,
        message: "Advisory circle member updated successfully",
      } as schemas.ResponseAdvisorySchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a advisory by ID.
 * @param {string} id - ID.
 * @returns {Promise} Response: [ResponseAdvisorySchema, ResponseIndicator.SUCCESS]
 */
export async function getAdvisoryApi(
  id: string
): Promise<
  [Error | schemas.ResponseAdvisorySchema | string, ResponseIndicatorValues]
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
          message: "Advisory circle member fetched successfully",
        } as schemas.ResponseAdvisorySchema,
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
 * Delete a advisory by ID
 * @param {AdvisorySchema} data - Data of the advisory
 * @returns {Promise} Response: [ResponseCustomerSchema, ResponseIndicator.SUCCESS]
 */
export async function deleteAdvisoryApi(
  data: schemas.AdvisorySchema
): Promise<
  [Error | schemas.ResponseAdvisorySchema | string, ResponseIndicatorValues]
> {
  try {
    const response = await runTransaction(db, async (transaction) => {
      // get stats doc
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const docRef = doc(db, dbCollectionName, data.id);

      // If the member has an image, delete it from Firebase Storage
      if (data.imgUrl) {
        await deleteFile({ objectUrl: data.imgUrl });
      }

      // create new doc
      transaction.delete(docRef);

      // increase aggregator
      transaction.update(dbInfoAggregatorRef, {
        advisoryCircle: dbInfoAggregatorDoc.data().advisoryCircle - 1,
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Advisory circle member deleted successfully.",
      } as schemas.ResponseAdvisorySchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
