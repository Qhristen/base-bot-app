import {
  League_Task,
  Ref_Task,
  SpecialTask,
  SubmitType,
  User_Activity,
} from "@/types";
import AxiosBaseUrl from "@/utils/services/axios-base-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  specialTask: SpecialTask[] | null;
  leagueTask: League_Task[] | null;
  refTask: Ref_Task[] | null;
  status: string;
  singleSpecialTask: SpecialTask | null;
  userActivities: User_Activity[] | null;
  userTasks: SubmitType[] | null;
}

const initialState: IUserState = {
  specialTask: null,
  leagueTask: null,
  refTask: null,
  singleSpecialTask: null,
  userActivities: null,
  userTasks: null,
  status: "idle",
};

export const fetchSpecialTask = createAsyncThunk("task/special", async () => {
  const response = await AxiosBaseUrl.get(`/task/special`);
  return response.data.data.task;
});

export const fetchLeagueTask = createAsyncThunk("task/league", async () => {
  const response = await AxiosBaseUrl.get(`/task/league`);
  return response.data.data.task;
});

export const fetchRefTask = createAsyncThunk("task/ref", async () => {
  const response = await AxiosBaseUrl.get(`/task/ref`);
  return response.data.data.task;
});

export const fetchAlluserTask = createAsyncThunk("task/user_task", async () => {
  const response = await AxiosBaseUrl.get(`/task/user-task/all`);
  return response.data.userTask;
});

export const fetchUserActivity = createAsyncThunk(
  "task/userActivity",
  async () => {
    const response = await AxiosBaseUrl.get(`/task/special/user_activity/all`);
    return response.data.data.activity;
  }
);

export const claimLeaguePoint = createAsyncThunk(
  "task/claimLeaguePoint",
  async (data: SubmitType, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.post(`/task/league/submit`, {
        name: data.name,
        taskId: data.taskId,
        userId: String(data.userId),
        status: data.status,
        point: data?.point,
        type: data.type,
      });
      return response.data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const fetchSingleSpecialActivity = createAsyncThunk(
  "task/fetchSingleSpecialActivity",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.get(`/task/special/${taskId}`);
      return response.data?.data?.task;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const claimRefPoint = createAsyncThunk(
  "task/claimRefPoint",
  async (data: SubmitType, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.post(`/task/ref/submit`, {
        name: data.name,
        taskId: data.taskId,
        userId: String(data.userId),
        status: data.status,
        point: data?.point,
        type: data.type,
      });
      return response.data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const submitSingleUserActivity = createAsyncThunk(
  "task/submitSingleUserActivity",
  async (
    {
      activityId,
      userId,
      clicked,
      taskId,
    }: { activityId: string; userId: string; taskId: string; clicked: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/task/special/submit/user_activity/${userId}/${taskId}`,
        { clicked: clicked, activityId }
      );
      return response.data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const submitSpecialTask = createAsyncThunk(
  "task/submitSpecialTask",
  async (data: SubmitType, { rejectWithValue }) => {
    try {
      const response = await AxiosBaseUrl.post(
        `/task/submit/special/${data.userId}/${data.taskId}`,
        {
          name: data?.name,
          status: data.status,
          point: data?.point,
          type: data.type,
        }
      );
      return response.data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

export const taskSlice = createSlice({
  initialState,
  name: "taskSlice",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSpecialTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSpecialTask.fulfilled, (state, action) => {
        state.status = "success";
        state.specialTask = action.payload;
      })
      .addCase(fetchLeagueTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLeagueTask.fulfilled, (state, action) => {
        state.status = "success";
        state.leagueTask = action.payload;
      })
      .addCase(fetchRefTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRefTask.fulfilled, (state, action) => {
        state.status = "success";
        state.refTask = action.payload;
      })
      .addCase(claimLeaguePoint.pending, (state, action) => {
        state.status = "claimLeaguePointLoading";
      })
      .addCase(claimLeaguePoint.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(claimRefPoint.pending, (state, action) => {
        state.status = "claimRefPointLoading";
      })
      .addCase(claimRefPoint.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(fetchSingleSpecialActivity.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSingleSpecialActivity.fulfilled, (state, action) => {
        state.status = "success";
        state.singleSpecialTask = action.payload;
      })
      .addCase(fetchUserActivity.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.status = "success";
        state.userActivities = action.payload;
      })
      .addCase(submitSingleUserActivity.pending, (state, action) => {
        // state.status = "loading";
      })
      .addCase(submitSingleUserActivity.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(submitSpecialTask.pending, (state, action) => {
        // state.status = "loading";
      })
      .addCase(submitSpecialTask.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(fetchAlluserTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAlluserTask.fulfilled, (state, action) => {
        state.status = "success";
        state.userTasks = action.payload
      });
  },
});

export default taskSlice.reducer;
