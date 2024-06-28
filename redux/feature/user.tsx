import { Badge, Referals, SpecialTask, User, User_Activity } from "@/types";
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
  userReferals: Referals[];
  badges: Badge[] | null;
  isAuth: Boolean;
  status: string;
  pointCount: number;
  totalPoints: number;
  miningInfo: MiningInfo;
  isPressed: boolean;
  textPoints: {
    id: number;
    identifier?: number;
    clientX: number;
    clientY: number;
  }[];
}

const initialState: IUserState = {
  user: null,
  userReferals: [],
  isAuth: false,
  status: "idle",
  pointCount: 0,
  totalPoints: 0,
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
      return response.data?.data;
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

export const welcomePageUpdate = createAsyncThunk(
  "user/welcomePageUpdate",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.post(`/user/welcome/${userId}`);
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
    clearTap(state) {
      state.pointCount = 0;
    },
    incrementPoints(state, action: PayloadAction<number>) {
      state.pointCount += action.payload;
      state.totalPoints += action.payload;
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
          
      }
    },
    updateMiningInfo(state, action: PayloadAction<Partial<MiningInfo>>) {
      state.miningInfo = { ...state.miningInfo, ...action.payload };
      if (state.user?.tapGuru) {
        state.user.tapGuru = {
          ...state.user?.tapGuru,
          active: false,
        };
      }

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
        state.miningInfo = {
          ...state.miningInfo,
          limit: Math.max(
            0,
            Math.min(
              state.miningInfo.limit + action.payload,
              state.miningInfo.max
            )
          ),
        };

        // if (state.miningInfo.limit <= 0) {
        //   state.miningInfo.limit = 0;
        // }
        // if (state.miningInfo.limit > state.miningInfo.max) {
        //   state.miningInfo.limit = state.miningInfo.max;
        // }
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
        state.totalPoints = action.payload.totalPoint;
        state.miningInfo = {
          ...state.miningInfo,
          limit: action.payload.limit,
          max: action.payload.max,
          perClick: action.payload.perclick,
        };
      })
      // .addCase(updateScore.pending, (state, action) => {
      //   state.pointCount += state.miningInfo.perClick;
      // })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(welcomePageUpdate.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      // .addCase(getTapGuru.pending, (state, action) => {
      //   state.status = "loading";
      // })
      .addCase(claimLeaguePoint.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(claimAutoBotPoints.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(getTapGuru.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "success";
        state.user = action.payload;
        state.miningInfo = {
          ...state.miningInfo,
          perClick: state.miningInfo.perClick * 5,
        };

        if (state.user?.tapGuru) {
          state.user.tapGuru = {
            ...state.user?.tapGuru,
            active: true,
          };
        }
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

      .addCase(
        upadteMultitap.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.user = action.payload;
          state.miningInfo = {
            ...state.miningInfo,
            perClick: action.payload.perclick,
          };
        }
      )
      .addCase(updateChargeLimit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        updateChargeLimit.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.user = action.payload;
          state.miningInfo = {
            ...state.miningInfo,
            limit: action.payload.limit,
            max: action.payload.max,
          };
        }
      )
      // .addCase(getFullEnergy.pending, (state, action) => {
      //   state.status = "loading";
      // })
      .addCase(
        getFullEnergy.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "success";
          state.user = action.payload;
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
  clearTap,
} = userSlice.actions;
