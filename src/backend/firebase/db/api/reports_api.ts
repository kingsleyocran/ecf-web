import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/reports";
import { ResponseIndicator, ResponseIndicatorValues } from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollection = collection(db, "reports");

function mapDoc(d: any): schemas.ReportSchema {
  return {
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toDate() : d.data().createdAt,
    updatedAt: d.data().updatedAt instanceof Timestamp ? d.data().updatedAt.toDate() : d.data().updatedAt,
  } as schemas.ReportSchema;
}

export async function getReportsApi(): Promise<[Error | schemas.ListResponseReportsSchema | string, ResponseIndicatorValues]> {
  try {
    const q = query(dbCollection, where("isActive", "==", true), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return [{ data: snap.docs.map(mapDoc), message: "Reports fetched" }, ResponseIndicator.SUCCESS];
  } catch (error: any) { return errorHandler(error); }
}

export async function getReportApi(id: string): Promise<[Error | schemas.ResponseReportSchema | string, ResponseIndicatorValues]> {
  try {
    const docSnap = await getDoc(doc(db, "reports", id));
    if (docSnap.exists()) return [{ data: mapDoc(docSnap), message: "Report fetched" }, ResponseIndicator.SUCCESS];
    return errorHandler({ message: "No such report found!" });
  } catch (error: any) { return errorHandler(error); }
}
