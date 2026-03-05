import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/events";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollectionName = "events";
const dbCollection = collection(db, dbCollectionName);

export async function getEventsApi(): Promise<
  [
    Error | schemas.ListResponseEventsSchema | string,
    ResponseIndicatorValues,
  ]
> {
  try {
    const q = query(
      dbCollection,
      where("isActive", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const response: schemas.EventSchema[] = [];
    querySnapshot.forEach((d) => {
      response.push({
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
      } as schemas.EventSchema);
    });

    return [
      { data: response, message: "Events fetched" },
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
            createdAt:
              docSnap.data().createdAt instanceof Timestamp
                ? docSnap.data().createdAt.toDate()
                : docSnap.data().createdAt,
            updatedAt:
              docSnap.data().updatedAt instanceof Timestamp
                ? docSnap.data().updatedAt.toDate()
                : docSnap.data().updatedAt,
          } as schemas.EventSchema,
          message: "Event fetched successfully",
        },
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such event found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}
