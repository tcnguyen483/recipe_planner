/* eslint-disable sort-imports */
/* eslint-disable no-unused-vars */
/*
 * Redux logic for all of the user app data.
 *
 * See these guides:
 *   https://redux-toolkit.js.org/usage/usage-with-typescript
 *   https://redux-toolkit.js.org/tutorials/typescript
 */

// eslint-disable-next-line no-unused-vars
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import axios from "axios";
import { PHO_URL } from "../services/phoBackend";
import { Auth0UserData } from "../services/auth0Management";
import { RecordedRecipe, PhoUserData } from "../services/phoBackend";

export enum UserCollectionLoadingStatus {
  ERROR = "Error",
  LOADED = "Loaded",
  LOADING = "Loading",
  NOT_LOADED = "Not Loaded",
}

// define a type for the slice states
interface UserCollectionState {
  savedRecipeIDs: Array<string>; // array of recipe ids
  recipeHistory: Array<RecordedRecipe>;
  loadingStatus: UserCollectionLoadingStatus;
}

export interface loadUserCollectionPayload {
  user: Auth0UserData;
  phoAccessToken: string;
}

export interface pushRecipeHistoryPayload {
  accessToken: string;
  recipeRecord: RecordedRecipe;
  auth0UserID: string;
}

export interface pushSavedRecipeIDPayload {
  accessToken: string;
  savedRecipeID: string;
  auth0UserID: string;
}

export interface deleteSavedRecipeIDPayload {
  accessToken: string;
  savedRecipeID: string;
  auth0UserID: string;
}

export interface createUserCollectionPayload {
  accessToken: string;
  auth0UserID: string;
}

const initialState: UserCollectionState = {
  savedRecipeIDs: [],
  recipeHistory: [],
  loadingStatus: UserCollectionLoadingStatus.NOT_LOADED,
};

//---------- Thunk functions (async functions) see redux-thunk ----------//
// Get's user data from  database and loads it into redux state
export const loadUserCollection = createAsyncThunk(
  "userCollection/loadUserCollection",
  async (payload: loadUserCollectionPayload) => {
    try {
      // get app related user data from pho backend
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.phoAccessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };
      const res = await axios.get(
        `${PHO_URL}users/${payload.user["http://localhost:8080/user_id"]}`,
        axiosConfig
      );
      const phoUserData = res.data as PhoUserData;

      return {
        savedRecipeIDs: phoUserData.savedRecipeIDs,
        recipeHistory: phoUserData.recipeHistory,
        loadingStatus: UserCollectionLoadingStatus.LOADED,
      } as UserCollectionState;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

// Create a new entry in user table in database and loads it into redux state
export const createUserCollection = createAsyncThunk(
  "userCollection/createUserCollection",
  async (payload: createUserCollectionPayload) => {
    try {
      // get app related user data from pho backend
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };
      const res = await axios.post(
        `${PHO_URL}users/`,
        {
          auth0ID: payload.auth0UserID,
          savedRecipeIDs: [],
          recipeHistory: [],
        },
        axiosConfig
      );
      const phoUserData = res.data as PhoUserData;

      return {
        savedRecipeIDs: phoUserData.savedRecipeIDs,
        recipeHistory: phoUserData.recipeHistory,
        loadingStatus: UserCollectionLoadingStatus.LOADED,
      } as UserCollectionState;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

// Add a new recipe record to recipe history in database and in redux state
export const pushRecipeHistory = createAsyncThunk(
  "userCollection/pushRecipeHistory",
  async (payload: pushRecipeHistoryPayload) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };

      const getRes = await axios.get(
        `${PHO_URL}users/${payload.auth0UserID}`,
        axiosConfig
      );
      const currUserData = getRes.data as PhoUserData;

      const putRes = await axios.put(
        `${PHO_URL}users/${payload.auth0UserID}`,
        {
          auth0ID: payload.auth0UserID,
          savedRecipeIDs: currUserData.savedRecipeIDs,
          recipeHistory: currUserData.recipeHistory.push(payload.recipeRecord),
        },
        axiosConfig
      );
      const updatedUserCollectionData = putRes.data as PhoUserData;

      return {
        savedRecipeIDs: updatedUserCollectionData.savedRecipeIDs,
        recipeHistory: updatedUserCollectionData.recipeHistory,
        loadingStatus: UserCollectionLoadingStatus.LOADED,
      } as UserCollectionState;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

// Add a new recipeID to the saved recipes in the database and in redux state
export const pushSavedRecipeID = createAsyncThunk(
  "userCollection/pushSavedRecipeID",
  async (payload: pushSavedRecipeIDPayload) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };

      const getRes = await axios.get(
        `${PHO_URL}users/${payload.auth0UserID}`,
        axiosConfig
      );
      const currUserData = getRes.data as PhoUserData;

      const putRes = await axios.put(
        `${PHO_URL}users/${payload.auth0UserID}`,
        {
          auth0ID: payload.auth0UserID,
          savedRecipeIDs: currUserData.savedRecipeIDs.push(
            payload.savedRecipeID
          ),
          recipeHistory: currUserData.recipeHistory,
        },
        axiosConfig
      );

      const updatedUserCollectionData = putRes.data as PhoUserData;

      return {
        savedRecipeIDs: updatedUserCollectionData.savedRecipeIDs,
        recipeHistory: updatedUserCollectionData.recipeHistory,
        loadingStatus: UserCollectionLoadingStatus.LOADED,
      } as UserCollectionState;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

// Remove a recipeID from the saved recipes in the database and in redux state
export const deleteSavedRecipeID = createAsyncThunk(
  "userCollection/deleteSavedRecipeID",
  async (payload: deleteSavedRecipeIDPayload) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };

      const getRes = await axios.get(
        `${PHO_URL}users/${payload.auth0UserID}`,
        axiosConfig
      );
      const currUserData = getRes.data as PhoUserData;

      const idx = currUserData.savedRecipeIDs.indexOf(payload.savedRecipeID);

      const resPayload = {
        auth0ID: payload.auth0UserID,
        savedRecipeIDs:
          idx > -1
            ? currUserData.savedRecipeIDs.splice(idx, 1)
            : currUserData.savedRecipeIDs,
        recipeHistory: currUserData.recipeHistory,
      };

      const putRes = await axios.put(
        `${PHO_URL}users/${payload.auth0UserID}`,
        resPayload,
        axiosConfig
      );

      const updatedUserCollectionData = putRes.data as PhoUserData;

      return {
        savedRecipeIDs: updatedUserCollectionData.savedRecipeIDs,
        recipeHistory: updatedUserCollectionData.recipeHistory,
        loadingStatus: UserCollectionLoadingStatus.LOADED,
      } as UserCollectionState;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

const userCollectionSlice = createSlice({
  name: "userCollection",
  initialState: initialState,
  reducers: {
    clearUserCollection: (state) => {
      state.recipeHistory = [];
      state.savedRecipeIDs = [];
      state.loadingStatus = UserCollectionLoadingStatus.NOT_LOADED;
    },
    setUserCollectionLoadingStatus: (
      state,
      action: PayloadAction<UserCollectionLoadingStatus>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserCollection.fulfilled, (state, { payload }) => {
      state = payload;
    });
    builder.addCase(loadUserCollection.rejected, (state) => {
      state.loadingStatus = UserCollectionLoadingStatus.ERROR;
    });
    builder.addCase(pushRecipeHistory.fulfilled, (state, { payload }) => {
      state = payload;
    });
    builder.addCase(pushSavedRecipeID.fulfilled, (state, { payload }) => {
      state = payload;
    });
    builder.addCase(deleteSavedRecipeID.fulfilled, (state, { payload }) => {
      state = payload;
    });
    builder.addCase(createUserCollection.fulfilled, (state, { payload }) => {
      state = payload;
    });
    builder.addCase(createUserCollection.rejected, (state) => {
      state.loadingStatus = UserCollectionLoadingStatus.ERROR;
    });
  },
});

export const selectSavedRecipeIDs = (state: RootState): Array<string> =>
  state.userCollection.savedRecipeIDs;
export const selectRecipeHistory = (state: RootState): Array<RecordedRecipe> =>
  state.userCollection.recipeHistory;
export const selectUserCollectionLoadingStatus = (
  state: RootState
): UserCollectionLoadingStatus => state.userCollection.loadingStatus;

export const {
  clearUserCollection,
  setUserCollectionLoadingStatus,
} = userCollectionSlice.actions;

export default userCollectionSlice.reducer;
