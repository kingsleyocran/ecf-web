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
import * as schemas from "../../../models/videos";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

// Constants
const dbCollectionName = "videos";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/videos`;

/**
 * Filter videos based on various criteria.
 * @param {FilterVideosSchema} requestData - Request Data
 * @returns {Promise} Response: [ListResponseVideosSchema, ResponseIndicator.SUCCESS]
 */
export async function filterVideosApi(
  requestData: schemas.FilterVideosSchema
): Promise<
  [Error | schemas.ListResponseVideosSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseVideosSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.VideoSchema[] = [];
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
        } as schemas.VideoSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "videos fetched",
        } as schemas.ListResponseVideosSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Create a new video.
 * @param {CreateVideoWithFileSchema} requestData - Request Data to create a video.
 * @returns {Promise} Response: [ResponseVideoSchema, ResponseIndicator.SUCCESS]
 */
export async function createVideoApi(
  requestData: schemas.CreateVideoWithFileSchema
): Promise<
  [Error | schemas.ResponseVideoSchema | string, ResponseIndicatorValues]
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

    const newData: Omit<schemas.VideoSchema, "id" | "createdAt" | "updatedAt"> =
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
        videos: (dbInfoAggregatorDoc.data().videos ?? 0) + 1,
      });

      transaction.update(dbInfoSitemapRef, {
        videoIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New video created successfully",
      } as schemas.ResponseVideoSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Update an existing video.
 * @param {UpdateVideoWithFileSchema} requestData - Request Data to update a video.
 * @returns {Promise} Response: [ResponseVideoSchema, ResponseIndicator.SUCCESS]
 */
export async function updateVideoApi(
  requestData: schemas.UpdateVideoWithFileSchema
): Promise<
  [Error | schemas.ResponseVideoSchema | string, ResponseIndicatorValues]
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
      schemas.UpdateVideoSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl,
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
        message: "Video updated successfully",
      } as schemas.ResponseVideoSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a video by ID.
 * @param {string} id - ID.
 * @returns {Promise} Response: [ResponseVideoSchema, ResponseIndicator.SUCCESS]
 */
export async function getVideoApi(
  id: string
): Promise<
  [Error | schemas.ResponseVideoSchema | string, ResponseIndicatorValues]
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
          message: "Video fetched successfully",
        } as schemas.ResponseVideoSchema,
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
 * Delete a video by ID
 * @param {VideoSchema} data - Data of the video
 * @returns {Promise} Response: [ResponseVideoSchema, ResponseIndicator.SUCCESS]
 */
export async function deleteVideoApi(
  data: schemas.VideoSchema
): Promise<
  [Error | schemas.ResponseVideoSchema | string, ResponseIndicatorValues]
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
        videos: (dbInfoAggregatorDoc.data().videos ?? 1) - 1,
      });

      transaction.update(dbInfoSitemapRef, {
        videoIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Video deleted successfully.",
      } as schemas.ResponseVideoSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
