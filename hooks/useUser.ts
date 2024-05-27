import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async (userId: string): Promise<User> => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`
  );
  const res = (await req.data.data.user) as User;
  return res;
};

const useUser = (userId: string) => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => await fetchUser(userId),
    retry: true
  });
};

export default useUser;
