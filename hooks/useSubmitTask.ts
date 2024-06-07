import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

 interface SubmitType {
  name: string | undefined;
  taskId: string | undefined;
  userId: string | undefined;
  status: string | undefined;
  point: number | undefined;
  type: string | undefined;
}
interface SubmitActivity {
  taskId: string | undefined;
  userId: string | undefined;
  clicked: boolean | undefined;
}

export const useSubmitSpecialTask = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitType): Promise<SubmitType> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/task/submit/special`,
      task
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ["submit_task"],
    mutationFn: (data: SubmitType) => submitTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_activity"] });
    },
  });
};

export const useSubmitRefTask = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitType): Promise<SubmitType> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/task/ref/submit`,
      task
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ["submit_ref"],
    mutationFn: submitTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ref"] });
    },
  });
};

export const useSubmitLeagueTask = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitType): Promise<SubmitType> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/task/league/submit`,
      task
    );

    return response.data;
  };

  return useMutation({
    mutationKey: ["submit_league"],
    mutationFn: submitTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["league"] });
    },
  });
};

export const useSubmitUserActivity = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitActivity): Promise<SubmitActivity> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/task/special/submit/activity`,
      task
    );

    return response.data;
  };

  return useMutation({
    mutationKey: ["submit_user_activity"],
    mutationFn: submitTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_activity"] });
    },
  });
};
