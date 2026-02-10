import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../../firebaseClient";
import * as schemas from "../../../models/team";
import { deleteFile, uploadFile } from "../../storage/storage_func";
import { v4 as uuidv4 } from "uuid";
import {
  ResponseIndicator,
  ResponseIndicatorValues,
} from "@/backend/models/_shared";
import { buildFirestoreQuery, errorHandler } from "../_base";
import { dbInfoAggregatorRef } from "../_dbInfo";

// Constants
const dbCollectionName = "team";
const dbCollection = collection(db, dbCollectionName);
const storageFilePath = `images/team`;

/**
 * Filter Teams based on various criteria.
 * @param {FilterTeamMembersSchema} requestData - Request Data
 * @returns {Promise} Response: [ListResponseTeamMemberSchema, ResponseIndicator.SUCCESS]
 */
export async function filterTeamMembersApi(
  requestData: schemas.FilterTeamMembersSchema
): Promise<
  [Error | schemas.ListResponseTeamMembersSchema | string, ResponseIndicatorValues]
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
        } as schemas.ListResponseTeamMembersSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      const response: schemas.TeamMemberSchema[] = [];
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
        } as schemas.TeamMemberSchema);
      });

      return [
        {
          data: response,
          recordsCount: response.length,
          lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
          message: "Teams fetched",
        } as schemas.ListResponseTeamMembersSchema,
        ResponseIndicator.SUCCESS,
      ];
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Create a new Team.
 * @param {CreateTeamWithFileSchema} requestData - Request Data to create an Team.
 * @returns {Promise} Response: [ResponseTeamMemberSchema, ResponseIndicator.SUCCESS]
 */
export async function createTeamMemberApi(
  requestData: schemas.CreateTeamMemberWithFileSchema
): Promise<
  [Error | schemas.ResponseTeamMemberSchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = "";
    let id = uuidv4();
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id,
        folderPath: storageFilePath,
      }); // Upload image if provided
    }

    const newMember: Omit<
      schemas.TeamMemberSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl || (requestData.data.imgUrl ?? null),
    };

    const response = await runTransaction(db, async (transaction) => {
      // get stats doc
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const newDocRef = doc(db, dbCollectionName, id);
      const newDocData = {
        ...newMember,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // create new doc
      transaction.set(newDocRef, newDocData);

      // increase aggregator
      transaction.update(dbInfoAggregatorRef, {
        team: dbInfoAggregatorDoc.data().team + 1,
      });

      return newDocData;
    });

    return [
      {
        data: response,
        message: "New Team created successfully",
      } as schemas.ResponseTeamMemberSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Update an existing Team.
 * @param {UpdateTeamWithFileSchema} requestData - Request Data to update a Team.
 * @returns {Promise} Response: [ResponseTeamMemberSchema, ResponseIndicator.SUCCESS]
 */
export async function updateTeamMemberApi(
  requestData: schemas.UpdateTeamMemberWithFileSchema
): Promise<
  [Error | schemas.ResponseTeamMemberSchema | string, ResponseIndicatorValues]
> {
  try {
    let imgUrl = requestData.data.imgUrl || "";
    let id = requestData.id;

    // If a new file is provided, upload it and get the new image URL
    if (requestData.file) {
      imgUrl = await uploadFile({
        file: requestData.file,
        fileID: id, // Use the existing member ID for the fileID
        folderPath: storageFilePath,
      });
    }

    // Prepare the updated member data
    const updatedMember: Omit<
      schemas.UpdateTeamMemberSchema,
      "id" | "createdAt" | "updatedAt"
    > = {
      ...requestData.data,
      imgUrl: imgUrl,
    };

    const response = await runTransaction(db, async (transaction) => {
      // get member doc
      const memberDocRef = doc(db, dbCollectionName, id);

      // update member data
      const updatedDocData = {
        ...updatedMember,
        updatedAt: new Date(), // Keep createdAt unchanged
      };

      transaction.update(memberDocRef, updatedDocData);
      return updatedDocData;
    });

    return [
      {
        data: response,
        message: "Team member updated successfully",
      } as schemas.ResponseTeamMemberSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Get a Team by ID.
 * @param {string} id - ID.
 * @returns {Promise} Response: [ResponseTeamMemberSchema, ResponseIndicator.SUCCESS]
 */
export async function getTeamMemberApi(
  id: string
): Promise<
  [Error | schemas.ResponseTeamMemberSchema | string, ResponseIndicatorValues]
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
          message: "Team member fetched successfully",
        } as schemas.ResponseTeamMemberSchema,
        ResponseIndicator.SUCCESS,
      ];
    } else {
      return errorHandler({ message: "No such data found!" });
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

/**
 * Delete a Team by ID
 * @param {TeamMemberSchema} data - Data of the Team
 * @returns {Promise} Response: [ResponseCustomerSchema, ResponseIndicator.SUCCESS]
 */
export async function deleteTeamMemberApi(
  data: schemas.TeamMemberSchema
): Promise<
  [Error | schemas.ResponseTeamMemberSchema | string, ResponseIndicatorValues]
> {
  try {
    const response = await runTransaction(db, async (transaction) => {
      // get stats doc
      const dbInfoAggregatorDoc = await transaction.get(dbInfoAggregatorRef);
      if (!dbInfoAggregatorDoc.exists()) {
        throw "DBInfo document does not exist!";
      }

      const docRef = doc(db, dbCollectionName, data.id);

      // If the member has an image, delete it from Firebase Storage
      if (data.imgUrl) {
        await deleteFile({ objectUrl: data.imgUrl });
      }

      // create new doc
      transaction.delete(docRef);

      // increase aggregator
      transaction.update(dbInfoAggregatorRef, {
        team: dbInfoAggregatorDoc.data().team - 1,
      });

      return data;
    });

    return [
      {
        data: response,
        message: "Team member deleted successfully.",
      } as schemas.ResponseTeamMemberSchema,
      ResponseIndicator.SUCCESS,
    ];
  } catch (error: any) {
    return errorHandler(error);
  }
}
