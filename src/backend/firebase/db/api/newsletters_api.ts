import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/newsletters";
import { ResponseIndicator, ResponseIndicatorValues } from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollection = collection(db, "newsletters");

function mapDoc(d: any): schemas.NewsletterSchema {
  return {
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toDate() : d.data().createdAt,
    updatedAt: d.data().updatedAt instanceof Timestamp ? d.data().updatedAt.toDate() : d.data().updatedAt,
  } as schemas.NewsletterSchema;
}

export async function getNewslettersApi(): Promise<[Error | schemas.ListResponseNewslettersSchema | string, ResponseIndicatorValues]> {
  try {
    const q = query(dbCollection, where("isActive", "==", true), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return [{ data: snap.docs.map(mapDoc), message: "Newsletters fetched" }, ResponseIndicator.SUCCESS];
  } catch (error: any) { return errorHandler(error); }
}
