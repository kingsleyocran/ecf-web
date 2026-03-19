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
import * as schemas from "../../../models/opeds";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

const dbCollectionName = "opeds";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/opeds`;

export async function filterOpedsApi(
  requestData: schemas.FilterOpedsSchema
): Promise<
  [Error | schemas.ListResponseOpedsSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseOpedsSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.OpEdSchema[] = [];
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
        } as schemas.OpEdSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "Op-eds fetched",
        } as schemas.ListResponseOpedsSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function createOpEdApi(
  requestData: schemas.CreateOpEdWithFileSchema
): Promise<
  [Error | schemas.ResponseOpEdSchema | string, ResponseIndicatorValues]
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

    const newData: Omit<schemas.OpEdSchema, "id" | "createdAt" | "updatedAt"> =
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
        opeds: (dbInfoAggregatorDoc.data().opeds ?? 0) + 1,
      });

      transaction.update(dbInfoSitemapRef, {
        opedIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New op-ed created successfully",
      } as schemas.ResponseOpEdSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function updateOpEdApi(
  requestData: schemas.UpdateOpEdWithFileSchema
): Promise<
  [Error | schemas.ResponseOpEdSchema | string, ResponseIndicatorValues]
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
      schemas.UpdateOpEdSchema,
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
        message: "Op-ed updated successfully",
      } as schemas.ResponseOpEdSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function getOpedApi(
  id: string
): Promise<
  [Error | schemas.ResponseOpEdSchema | string, ResponseIndicatorValues]
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
          message: "Op-ed fetched successfully",
        } as schemas.ResponseOpEdSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such op-ed found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function deleteOpEdApi(
  data: schemas.OpEdSchema
): Promise<
  [Error | schemas.ResponseOpEdSchema | string, ResponseIndicatorValues]
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
        opeds: (dbInfoAggregatorDoc.data().opeds ?? 1) - 1,
      });

      transaction.update(dbInfoSitemapRef, {
        opedIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Op-ed deleted successfully.",
      } as schemas.ResponseOpEdSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
