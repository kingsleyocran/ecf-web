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
import * as schemas from "../../../models/events";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

const dbCollectionName = "events";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/events`;

export async function filterEventsApi(
  requestData: schemas.FilterEventsSchema
): Promise<
  [Error | schemas.ListResponseEventsSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseEventsSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.EventSchema[] = [];
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
        } as schemas.EventSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "Events fetched",
        } as schemas.ListResponseEventsSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function createEventApi(
  requestData: schemas.CreateEventWithFileSchema
): Promise<
  [Error | schemas.ResponseEventSchema | string, ResponseIndicatorValues]
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

    const newData: Omit<schemas.EventSchema, "id" | "createdAt" | "updatedAt"> =
      {
        ...requestData.data,
        isActive: true,
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
        events: (dbInfoAggregatorDoc.data().events ?? 0) + 1,
      });

      transaction.update(dbInfoSitemapRef, {
        eventIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New event created successfully",
      } as schemas.ResponseEventSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function updateEventApi(
  requestData: schemas.UpdateEventWithFileSchema
): Promise<
  [Error | schemas.ResponseEventSchema | string, ResponseIndicatorValues]
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
      schemas.UpdateEventSchema,
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
        message: "Event updated successfully",
      } as schemas.ResponseEventSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function getEventApi(
  id: string
): Promise<
  [Error | schemas.ResponseEventSchema | string, ResponseIndicatorValues]
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
          message: "Event fetched successfully",
        } as schemas.ResponseEventSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such event found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function deleteEventApi(
  data: schemas.EventSchema
): Promise<
  [Error | schemas.ResponseEventSchema | string, ResponseIndicatorValues]
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
        events: (dbInfoAggregatorDoc.data().events ?? 1) - 1,
      });

      transaction.update(dbInfoSitemapRef, {
        eventIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Event deleted successfully.",
      } as schemas.ResponseEventSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
