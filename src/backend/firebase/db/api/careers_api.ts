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
import * as schemas from "../../../models/careers";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollectionName = "careers";
const dbCollection = collection(db, dbCollectionName);

/**
 * Get all active careers ordered by creation date descending.
 */
export async function getCareersApi(): Promise<
  [
    Error | schemas.ListResponseCareersSchema | string,
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

    const response: schemas.CareerSchema[] = [];
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
      } as schemas.CareerSchema);
    });

    return [
      { data: response, message: "Careers fetched" },
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a single career by ID.
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
            createdAt:
              docSnap.data().createdAt instanceof Timestamp
                ? docSnap.data().createdAt.toDate()
                : docSnap.data().createdAt,
            updatedAt:
              docSnap.data().updatedAt instanceof Timestamp
                ? docSnap.data().updatedAt.toDate()
                : docSnap.data().updatedAt,
          } as schemas.CareerSchema,
          message: "Career fetched successfully",
        },
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such career found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}
