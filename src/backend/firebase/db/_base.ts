import {
  FilterDataRequest,
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import {
  CollectionReference,
  orderBy,
  Query,
  Timestamp,
} from "firebase/firestore";
import {
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";

// Error handler function
export function errorHandler(error: any): [string, ResponseIndicatorValues] {
  console.error("ERROR => ", error);

  // if (error.response) {
  //   if (error.response.status === 422) {
  //     return [validationErrorMessage, ResponseIndicator.ERROR];
  //   } else if (
  //     error.response.status === 400 &&
  //     error.response.data.errorType === "HTTPException"
  //   ) {
  //     return [error.response.data.detail, ResponseIndicator.ERROR];
  //   } else if (
  //     error.response.status === 409 &&
  //     (error.response.data.errorType === "ForeignKeyViolationError" ||
  //       error.response.data.errorType === "UniqueViolationError")
  //   ) {
  //     return [error.response.data.detail, ResponseIndicator.ERROR];
  //   } else if (error.response.status === 404) {
  //     return [notFoundErrorMessage, ResponseIndicator.ERROR];
  //   } else {
  //     return [genericErrorMessage, ResponseIndicator.ERROR];
  //   }
  // }

  // if (error.request) {
  //   if (error?.toJSON().message === "Network Error") {
  //     return [networkErrorMessage, ResponseIndicator.ERROR];
  //   } else {
  //     return [error.toJSON().message ?? error.message, ResponseIndicator.ERROR];
  //   }
  // }

  return [error.message, ResponseIndicator.ERROR];
}

export function buildFirestoreQuery<T extends Partial<FilterDataRequest>>(
  requestData: T,
  collectionRef: CollectionReference
): Query {
  let q: Query = query(collectionRef);

  try {
    // Loop through each key in the requestData object except 'orderBy', 'orderDirection', and 'startAfterDoc'
    Object.entries(requestData).forEach(([key, value]) => {
      if (
        [
          "orderBy",
          "orderDirection",
          "startAfterDoc",
          "startAfterDocQueue",
        ].includes(key)
      ) {
        // Skip the logic for the excluded keys
        return;
      }

      if (typeof value === "string") {
        // For string values, use 'like' or '=='
        q = query(
          q,
          where(key, ">=", value.toLowerCase()),
          where(key, "<=", value.toLowerCase() + "\uf8ff")
        );
        requestData.orderBy = undefined;
        requestData.orderDirection = undefined;
      } else if (Array.isArray(value) && value.length > 0) {
        // For array values, use 'array-contains'
        value.forEach((item) => {
          q = query(q, where(key, "array-contains", item));
        });
      } else if (value instanceof Timestamp) {
        // For Timestamp values
        q = query(q, where(key, "==", value));
      }
    });

    // Apply ordering if specified
    if (requestData.orderBy) {
      const direction = requestData.orderDirection ?? "asc";
      q = query(q, orderBy(requestData.orderBy, direction));
    }

    // Handle pagination (start after document)
    if (
      requestData.startAfterDocQueue &&
      requestData.startAfterDocQueue?.length > 0
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

    // Apply limit if provided
    if (requestData?.limit) {
      q = query(q, limit(requestData.limit));
    }
  } catch (error) {
    console.log(error);
  }

  return q;
}
