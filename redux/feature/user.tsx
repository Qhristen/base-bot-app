import { Badge, User } from "@/types";
import AxiosBaseUrl from "@/utils/services/axios-base-config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFullEnergy, getTapGuru, upadteMultitap, updateChargeLimit } from "./boost";
import { stat } from "fs";

interface MiningInfo {
  limit: number;
  perClick: number;
  status?: "idle" | "mining" | "stop";
  max: number;
}

interface IUserState {
  user: User | null;
  badges: Badge[] | null;
  isAuth: Boolean;
  status: string;
  pointCount: number;
  counter: number;
  miningInfo: MiningInfo;
  isPressed: boolean;
  textPoints: {
    id: number;
    identifier: number;
    clientX: number;
    clientY: number;
  }[];
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
  status: "idle",
  pointCount: 0,
  counter: 0,
  miningInfo: { limit: 100, perClick: 1, status: "idle", max: 100 }, // Initialize with some default values
  isPressed: false,
  textPoints: [],
  badges: [],
};

export const fetchUser = createAsyncThunk(
  "user",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.get(`/user/${userId}`);
      return response.data?.data?.user;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const updateScore = createAsyncThunk(
  "user/updateScore",
  async (
    { userId, point }: { userId: string; point: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(`/user/${userId}/add-point`, {
        point,
      });
      return response.data?.point;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const updateLimit = createAsyncThunk(
  "user/updateLimit",
  async (
    { userId, min, max }: { userId: string; min: number; max: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(`/user/update/limit/${userId}`, {
        min,
        max,
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

export const fetchBadges = createAsyncThunk("user/badges", async () => {
  const response = await AxiosBaseUrl.get(`/users/badges`);
  return response.data.badges;
});

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setIsPressed(state, action: PayloadAction<boolean>) {
      state.isPressed = action.payload;
    },
    incrementPoints(state, action: PayloadAction<number>) {
      state.pointCount += action.payload;
    },
    updateTapguru(state) {
      state.miningInfo = {
        ...state.miningInfo,
        perClick: Number(state?.user?.perclick) * 5,
      };
    },
    updateMiningInfo(state, action: PayloadAction<Partial<MiningInfo>>) {
      state.miningInfo = { ...state.miningInfo, ...action.payload };
      // state.pointCount += action?.payload?.perClick;
    },
    addTextPoints(
      state,
      action: PayloadAction<
        { id: number; identifier: number; clientX: number; clientY: number }[]
      >
    ) {
      state.textPoints = [...state.textPoints, ...action.payload];
      // state.pointCount += state.miningInfo.perClick * state.textPoints.length
    },
    removePoint(state, action: PayloadAction<number>) {
      state.textPoints = state.textPoints.filter(
        (point) => point.id !== action.payload
      );
    },
    incrementMiningLimit(state, action) {
      if (state.miningInfo.limit < state.miningInfo.max) {
        state.miningInfo.limit += action.payload;
        if (
          state.miningInfo.limit === state.miningInfo.max &&
          state.miningInfo.limit !== state.miningInfo.max
        ) {
          state.miningInfo.limit = state.miningInfo.max;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "success";
        state.user = action.payload;
        state.pointCount = action.payload.totalPoint;
        state.miningInfo = {
          limit: action.payload.limit,
          max: action.payload.max,
          perClick: action.payload.perclick,
        };
      })
      .addCase(updateScore.pending, (state, action) => {
        state.pointCount += state.miningInfo.perClick;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(getTapGuru.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "success";
        state.miningInfo ={
          ...state.miningInfo,
          perClick: state.miningInfo.perClick * 5
        }
      })
      // .addCase(updateLimit.fulfilled, (state, action) => {
      //   state.status = "success";
      //   // state.user = action.payload;
      // })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.status = "success";
        state.badges = action.payload;
      })
      .addCase(upadteMultitap.fulfilled, (state, action: PayloadAction<User>) => {
        // state.status = "success";
        state.miningInfo ={
          ...state.miningInfo,
          perClick: action.payload.perclick
        }
      })
      .addCase(updateChargeLimit.fulfilled, (state, action: PayloadAction<User>) => {
        // state.status = "success";
        state.miningInfo ={
          ...state.miningInfo,
          limit: action.payload.limit,
          max: action.payload.max
        }
      })
      .addCase(
        getFullEnergy.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.miningInfo = {
            limit: action.payload.limit,
            max: action.payload.max,
            perClick: action.payload.perclick,
          };
        }
      );
  },
});

export default userSlice.reducer;

export const {
  setUser,
  addTextPoints,
  incrementPoints,
  setIsPressed,
  updateMiningInfo,
  removePoint,
  incrementMiningLimit,
  updateTapguru,
} = userSlice.actions;
