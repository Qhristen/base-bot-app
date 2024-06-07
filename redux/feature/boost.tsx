import { User } from "@/types";
import AxiosBaseUrl from "@/utils/services/axios-base-config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Res = {
  min: number;
  active: boolean;
  max: number;
};
interface IUserState {
  tapGuru: Res | null;
  fullEnergy: Res | null;
  multitap: User | null;
  status: string;
}

const initialState: IUserState = {
  tapGuru: null,
  fullEnergy: null,
  multitap: null,
  status: "idle",
};

export const getTapGuru = createAsyncThunk(
  "boost/getTapGuru",
  async (
    {
      min,
      max,
      active,
      userId,
    }: { min: number; max: number; active: boolean; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.patch(`/user/${userId}/tapguru`, {
        min,
        max,
        active,
      });
      return response.data.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const getFullEnergy = createAsyncThunk(
  "boost/getFullEnergy",
  async (
    {
      min,
      max,
      active,
      userId,
      limit,
    }: {
      min: number;
      max: number;
      limit: number;
      active: boolean;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.patch(`/user/${userId}/energy`, {
        min,
        max,
        active,
        limit,
      });
      return response.data?.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const upadteMultitap = createAsyncThunk(
  "boost/upadteMultitap",
  async ({ userId, point }: { userId: string, point:number }, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.patch(`/user/${userId}/multitap`, {
        point,
      });
      return response.data.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);


export const updateChargeLimit = createAsyncThunk(
  "boost/updateChargeLimit",
  async (
    { userId, point, limit }: { userId: string; point: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/user/update/charge-limit/${userId}`,
        {
          point,
          limit,
        }
      );
      return response.data.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const updateRefillSpeed = createAsyncThunk(
  "boost/updateRefillSpeed",
  async (
    { userId, point, speed }: { userId: string; point: number; speed: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/user/update/refill-speed/${userId}`,
        {
          point,
          speed,
        }
      );
      return response.data.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const boostSlice = createSlice({
  initialState,
  name: "boostSlice",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTapGuru.fulfilled, (state, action) => {
        state.status = "success";
        state.tapGuru = action.payload;
      })
      .addCase(getFullEnergy.fulfilled, (state, action) => {
        state.status = "success";
        state.fullEnergy = action.payload;
      })
      .addCase(upadteMultitap.fulfilled, (state, action) => {
        state.status = "success";
        state.multitap = action.payload;
      })
      .addCase(updateChargeLimit.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateRefillSpeed.fulfilled, (state, action) => {
        state.status = "success";
      });
  },
});

export default boostSlice.reducer;

export const {} = boostSlice.actions;
