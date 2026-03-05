import { collection, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/articles";
import { ResponseIndicator, ResponseIndicatorValues } from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollection = collection(db, "articles");

function mapDoc(d: any): schemas.ArticleSchema {
  return {
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toDate() : d.data().createdAt,
    updatedAt: d.data().updatedAt instanceof Timestamp ? d.data().updatedAt.toDate() : d.data().updatedAt,
  } as schemas.ArticleSchema;
}

export async function getArticlesApi(): Promise<[Error | schemas.ListResponseArticlesSchema | string, ResponseIndicatorValues]> {
  try {
    const q = query(dbCollection, where("isActive", "==", true), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return [{ data: snap.docs.map(mapDoc), message: "Articles fetched" }, ResponseIndicator.SUCCESS];
  } catch (error: any) { return errorHandler(error); }
}

export async function getArticleApi(id: string): Promise<[Error | schemas.ResponseArticleSchema | string, ResponseIndicatorValues]> {
  try {
    const docSnap = await getDoc(doc(db, "articles", id));
    if (docSnap.exists()) return [{ data: mapDoc(docSnap), message: "Article fetched" }, ResponseIndicator.SUCCESS];
    return errorHandler({ message: "No such article found!" });
  } catch (error: any) { return errorHandler(error); }
}
