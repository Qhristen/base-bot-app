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

export const useSubmitSpecialTask = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitType): Promise<SubmitType> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/task/submit`,
      task
    );
    queryClient.invalidateQueries({ queryKey: ["specialTask"] });
    return response.data as SubmitType;
  };

  return useMutation({ mutationFn: submitTask });
};

export const useSubmitRefTask = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitType): Promise<SubmitType> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/ref/submit`,
      task
    );
    queryClient.invalidateQueries({ queryKey: ["ref"] });
    return response.data as SubmitType;
  };

  return useMutation({ mutationFn: submitTask });
};

export const useSubmitLeagueTask = () => {
  const queryClient = useQueryClient();
  const submitTask = async (task: SubmitType): Promise<SubmitType> => {
    const response = await axios.post(
      `process.env.NEXT_PUBLIC_BACKEND_URL}/league/submit`,
      task
    );
    queryClient.invalidateQueries({ queryKey: ["ref"] });
    return response.data as SubmitType;
  };

  return useMutation({ mutationFn: submitTask });
};
