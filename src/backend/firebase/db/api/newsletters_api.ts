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
import * as schemas from "../../../models/newsletters";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef, dbInfoSitemapRef } from "../_dbInfo";

const dbCollectionName = "newsletters";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/newsletters`;

export async function filterNewslettersApi(
  requestData: schemas.FilterNewslettersSchema
): Promise<
  [Error | schemas.ListResponseNewslettersSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseNewslettersSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.NewsletterSchema[] = [];
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
        } as schemas.NewsletterSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "Newsletters fetched",
        } as schemas.ListResponseNewslettersSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function createNewsletterApi(
  requestData: schemas.CreateNewsletterWithFileSchema
): Promise<
  [Error | schemas.ResponseNewsletterSchema | string, ResponseIndicatorValues]
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

    const newData: Omit<schemas.NewsletterSchema, "id" | "createdAt" | "updatedAt"> =
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
        newsletters: (dbInfoAggregatorDoc.data().newsletters ?? 0) + 1,
      });

      transaction.update(dbInfoSitemapRef, {
        newsletterIDs: arrayUnion(id),
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New newsletter created successfully",
      } as schemas.ResponseNewsletterSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function updateNewsletterApi(
  requestData: schemas.UpdateNewsletterWithFileSchema
): Promise<
  [Error | schemas.ResponseNewsletterSchema | string, ResponseIndicatorValues]
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
      schemas.UpdateNewsletterSchema,
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
        message: "Newsletter updated successfully",
      } as schemas.ResponseNewsletterSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function getNewsletterApi(
  id: string
): Promise<
  [Error | schemas.ResponseNewsletterSchema | string, ResponseIndicatorValues]
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
          message: "Newsletter fetched successfully",
        } as schemas.ResponseNewsletterSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such newsletter found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function deleteNewsletterApi(
  data: schemas.NewsletterSchema
): Promise<
  [Error | schemas.ResponseNewsletterSchema | string, ResponseIndicatorValues]
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
        newsletters: (dbInfoAggregatorDoc.data().newsletters ?? 1) - 1,
      });

      transaction.update(dbInfoSitemapRef, {
        newsletterIDs: arrayRemove(data.id),
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Newsletter deleted successfully.",
      } as schemas.ResponseNewsletterSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
