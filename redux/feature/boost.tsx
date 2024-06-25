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
  async (
    { userId, level }: { userId: string; point?: number; level: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.patch(`/user/${userId}/multitap`, {
        level,
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
    { userId, level, limit }: { userId: string; level: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/user/update/charge-limit/${userId}`,
        {
          level,
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
    { userId, level, speed }: { userId: string; level: number; speed: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/user/update/refill-speed/${userId}`,
        {
          level,
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

export const purchaseAutoBot = createAsyncThunk(
  "boost/purchaseAutoBot",
  async (
    { userId, point }: { userId: string; point: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(`/user/buy-auto-bot/${userId}`, {
        point,
      });
      return response.data.data.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const claimAutoBotPoints = createAsyncThunk(
  "boost/claimAutoBotPoints",
  async (
    { userId, point }: { userId: string; point: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/user/claim/auto-bot-point/${userId}`,
        {
          point,
        }
      );
      return response.data.data.user;
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
      .addCase(upadteMultitap.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateChargeLimit.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateChargeLimit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateRefillSpeed.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(updateRefillSpeed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(claimAutoBotPoints.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(claimAutoBotPoints.pending, (state, action) => {
        state.status = "laoding";
      })
      .addCase(purchaseAutoBot.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(purchaseAutoBot.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export default boostSlice.reducer;

export const {} = boostSlice.actions;
