import {
  collection,
  doc,
  getDocs,
  runTransaction,
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/news";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { errorHandler } from "../_base";

const dbCollectionName = "news_articles";
const dbCollection = collection(db, dbCollectionName);

/**
 * Normalize a raw Firestore doc into NewsArticleSchema.
 * Converts Timestamps to Date objects.
 */
function normalizeNewsDoc(id: string, data: any): schemas.NewsArticleSchema {
  return {
    id,
    source: data.source || "",
    title: data.title || "",
    titleSearch: data.titleSearch || "",
    description: data.description ?? null,
    imageUrl: data.imageUrl ?? null,
    link: data.link || "",
    crawledAt:
      data.crawledAt instanceof Timestamp
        ? data.crawledAt.toDate()
        : data.crawledAt,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : data.createdAt,
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate()
        : data.updatedAt,
  };
}

/**
 * Fetch news articles with optional source filter and search.
 * NOTE: source filter uses EXACT match (not prefix search like buildFirestoreQuery).
 * We build the query manually here because buildFirestoreQuery uses >= <= for strings
 * which is wrong for source (enum-style exact match).
 *
 * @param {FilterNewsSchema} requestData - Filter options
 * @returns {Promise} [ListResponseNewsSchema, ResponseIndicator.SUCCESS]
 */
export async function filterNewsArticlesApi(
  requestData: schemas.FilterNewsSchema
): Promise<
  [Error | schemas.ListResponseNewsSchema | string, ResponseIndicatorValues]
> {
  try {
    console.log("[news_api] filterNewsArticlesApi called with:", requestData);

    let q = query(dbCollection);

    // Apply exact-match source filter
    if (requestData.source) {
      console.log(`[news_api] Applying source filter: ${requestData.source}`);
      q = query(q, where("source", "==", requestData.source));
    }

    // Apply prefix search on titleSearch field
    if (requestData.titleSearch) {
      const search = requestData.titleSearch.toLowerCase();
      console.log(`[news_api] Applying titleSearch filter: "${search}"`);
      q = query(
        q,
        where("titleSearch", ">=", search),
        where("titleSearch", "<=", search + "\uf8ff")
      );
    }

    // Apply ordering (default: crawledAt desc)
    const orderField = requestData.orderBy ?? "crawledAt";
    const orderDir = requestData.orderDirection ?? "desc";
    q = query(q, orderBy(orderField, orderDir));

    // Apply pagination
    if (
      requestData.startAfterDocQueue &&
      requestData.startAfterDocQueue.length > 0
    ) {
      q = query(
        q,
        startAfter(
          requestData.startAfterDocQueue[
            requestData.startAfterDocQueue.length - 1
          ]
        )
      );
    }

    // Apply limit
    if (requestData.limit) {
      q = query(q, limit(requestData.limit));
    }

    const querySnapshot = await getDocs(q);
    console.log(`[news_api] Query returned ${querySnapshot.size} documents`);

    if (querySnapshot.empty) {
      return [
        {
          data: [],
          recordsCount: 0,
          message: "No news articles found",
        } as schemas.ListResponseNewsSchema,
        ResponseIndicator.SUCCESS,
      ];
    }

    const response: schemas.NewsArticleSchema[] = [];
    querySnapshot.forEach((docSnap) => {
      response.push(normalizeNewsDoc(docSnap.id, docSnap.data()));
    });

    console.log(`[news_api] Returning ${response.length} news articles`);

    return [
      {
        data: response,
        recordsCount: response.length,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        message: "News articles fetched successfully",
      } as schemas.ListResponseNewsSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    console.error("[news_api] filterNewsArticlesApi error:", error);
    return errorHandler(error);
  }
}

/**
 * Batch-create multiple news articles in a single Firestore transaction.
 * Each article gets a new UUID as its document ID.
 *
 * @param {CreateNewsArticleSchema[]} articles - Articles to save
 * @returns {Promise} [{ data: savedCount, message }, ResponseIndicator.SUCCESS]
 */
export async function batchCreateNewsArticlesApi(
  articles: schemas.CreateNewsArticleSchema[]
): Promise<[Error | { data: number; message: string } | string, ResponseIndicatorValues]> {
  try {
    console.log(
      `[news_api] batchCreateNewsArticlesApi — saving ${articles.length} articles`
    );

    await runTransaction(db, async (transaction) => {
      for (const article of articles) {
        const id = uuidv4();
        const docRef = doc(db, dbCollectionName, id);
        const now = new Date();
        const docData = {
          ...article,
          crawledAt: now,
          createdAt: now,
          updatedAt: now,
        };
        console.log(
          `[news_api] Writing article: "${article.title}" (id: ${id})`
        );
        transaction.set(docRef, docData);
      }
    });

    console.log(
      `[news_api] batchCreateNewsArticlesApi — successfully saved ${articles.length} articles`
    );

    return [
      {
        data: articles.length,
        message: `${articles.length} news article(s) saved successfully`,
      },
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    console.error("[news_api] batchCreateNewsArticlesApi error:", error);
    return errorHandler(error);
  }
}

/**
 * Delete a single news article by ID.
 *
 * @param {NewsArticleSchema} article - The article to delete
 * @returns {Promise} [ResponseNewsSchema, ResponseIndicator.SUCCESS]
 */
export async function deleteNewsArticleApi(
  article: schemas.NewsArticleSchema
): Promise<
  [Error | schemas.ResponseNewsSchema | string, ResponseIndicatorValues]
> {
  try {
    console.log(
      `[news_api] deleteNewsArticleApi — deleting article id: ${article.id}, title: "${article.title}"`
    );

    const docRef = doc(db, dbCollectionName, article.id);
    await deleteDoc(docRef);

    console.log(`[news_api] Article deleted successfully: ${article.id}`);

    return [
      {
        data: article,
        message: "News article deleted successfully",
      } as schemas.ResponseNewsSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    console.error("[news_api] deleteNewsArticleApi error:", error);
    return errorHandler(error);
  }
}
