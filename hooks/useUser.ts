import { User } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export function useUser(userId: string) {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const req = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`
        );
        const res = (await req.data.data.user) as User;
        setUserData(res);
        setLoading(false);
      } catch (error) {}
    })();
  }, [userId]);

  return { userData, loading };
}
