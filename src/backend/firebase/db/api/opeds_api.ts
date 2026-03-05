import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/opeds";
import { ResponseIndicator, ResponseIndicatorValues } from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollection = collection(db, "opeds");

function mapDoc(d: any): schemas.OpEdSchema {
  return {
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toDate() : d.data().createdAt,
    updatedAt: d.data().updatedAt instanceof Timestamp ? d.data().updatedAt.toDate() : d.data().updatedAt,
  } as schemas.OpEdSchema;
}

export async function getOpedsApi(): Promise<[Error | schemas.ListResponseOpedsSchema | string, ResponseIndicatorValues]> {
  try {
    const q = query(dbCollection, where("isActive", "==", true), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return [{ data: snap.docs.map(mapDoc), message: "Op-Eds fetched" }, ResponseIndicator.SUCCESS];
  } catch (error: any) { return errorHandler(error); }
}

export async function getOpedApi(id: string): Promise<[Error | schemas.ResponseOpEdSchema | string, ResponseIndicatorValues]> {
  try {
    const docSnap = await getDoc(doc(db, "opeds", id));
    if (docSnap.exists()) return [{ data: mapDoc(docSnap), message: "Op-Ed fetched" }, ResponseIndicator.SUCCESS];
    return errorHandler({ message: "No such op-ed found!" });
  } catch (error: any) { return errorHandler(error); }
}
