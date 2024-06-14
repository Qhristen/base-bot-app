import { Badge, User } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/utils/local-storage-mgt";
import AxiosBaseUrl from "@/utils/services/axios-base-config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  claimAutoBotPoints,
  getFullEnergy,
  getTapGuru,
  upadteMultitap,
  updateChargeLimit,
  updateRefillSpeed,
} from "./boost";
import { claimLeaguePoint } from "./task";

interface MiningInfo {
  limit: number;
  perClick: number;
  status?: string;
  max: number;
}

interface IUserState {
  user: User | null;
  userReferals: User[];
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

const MiningInfoLs = getLocalStorage("user_mininginfo");
const miningInfo = !!MiningInfoLs
  ? (JSON.parse(MiningInfoLs as string) as MiningInfo)
  : {
      limit: 50,
      perClick: 1,
      max: 50,
    };

const initialState: IUserState = {
  user: null,
  userReferals: [],
  isAuth: false,
  status: "idle",
  pointCount: 0,
  counter: 0,
  miningInfo: {
    limit: 0,
    perClick: 0,
    max: 0,
  }, // Initialize with some default values
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
export const fetchUserReferals = createAsyncThunk(
  "user/fetchUserReferals",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.get(`/user/referals/${userId}`);
      return response.data?.data?.referals;
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

const updateMiningInfoInLocalStorage = (miningInfo: MiningInfo) => {
  setLocalStorage("user_mininginfo", miningInfo);
};

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
      // updateMiningInfoInLocalStorage({
      //   ...state.miningInfo,
      // });
    },
    updateTapguru(state) {
      if (state.miningInfo.limit !== 0) {
        state.miningInfo = {
          ...state.miningInfo,
          perClick: Number(state?.user?.perclick) * 5,
        };
        // updateMiningInfoInLocalStorage({
        //   ...state.miningInfo,
        //   perClick: Number(state?.user?.perclick) * 5,
        // });
      }
    },
    updateMiningInfo(state, action: PayloadAction<Partial<MiningInfo>>) {
      state.miningInfo = { ...state.miningInfo, ...action.payload };
      // state.pointCount += action?.payload?.perClick;
      // updateMiningInfoInLocalStorage({...state.miningInfo});
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

        if (state.miningInfo.limit > state.miningInfo.max) {
          state.miningInfo.limit = state.miningInfo.max;
        }
        // updateMiningInfoInLocalStorage(state.miningInfo);
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
          ...state.miningInfo,
          limit: action.payload.limit,
          max: action.payload.max,
          perClick: action.payload.perclick,
        };

        // updateMiningInfoInLocalStorage({
        //   limit:
        //   state.miningInfo.limit < state.miningInfo.max
        //     ? state.miningInfo.limit
        //     : action.payload.limit,
        // max: action.payload.max,
        // perClick: action.payload.perclick,
        // });
      })
      .addCase(updateScore.pending, (state, action) => {
        state.pointCount += state.miningInfo.perClick;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(getTapGuru.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(claimLeaguePoint.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(claimAutoBotPoints.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(getTapGuru.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "success";
        state.miningInfo = {
          ...state.miningInfo,
          limit: Math.max(0, state.miningInfo.limit),
          perClick: state.miningInfo.perClick * 5,
        };
        // updateMiningInfoInLocalStorage({
        //   ...state.miningInfo,
        //   limit: state.miningInfo.limit,
        //   perClick: state.miningInfo.perClick * 5,
        // });
      })
      .addCase(updateRefillSpeed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        updateRefillSpeed.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.user = action.payload;
        }
      )
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.status = "success";
        state.badges = action.payload;
      })
      .addCase(fetchUserReferals.fulfilled, (state, action) => {
        state.status = "success";
        state.userReferals = action.payload;
      })
      .addCase(upadteMultitap.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        upadteMultitap.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.miningInfo = {
            ...state.miningInfo,
            perClick: action.payload.perclick,
          };

          // updateMiningInfoInLocalStorage({
          //   ...state.miningInfo,
          //   perClick: action.payload.perclick,
          // });
        }
      )
      .addCase(updateChargeLimit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        updateChargeLimit.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.miningInfo = {
            ...state.miningInfo,
            limit: action.payload.limit,
            max: action.payload.max,
          };
          // updateMiningInfoInLocalStorage({
          //   ...state.miningInfo,
          //   limit: action.payload.limit,
          //   max: action.payload.max,
          // });
        }
      )
      // .addCase(getFullEnergy.pending, (state, action) => {
      //   state.status = "loading";
      // })
      .addCase(
        getFullEnergy.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.miningInfo = {
            limit: action.payload.limit,
            max: action.payload.max,
            perClick: action.payload.perclick,
          };
          // updateMiningInfoInLocalStorage({
          //   ...state.miningInfo,
          //   limit: action.payload.limit,
          //   max: action.payload.max,
          //   perClick: action.payload.perclick,
          // });
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
