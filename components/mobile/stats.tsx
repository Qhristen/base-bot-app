"use client";

import { IStats } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Container from "../container";
import { TelegramContext } from "@/context/telegram-context";
import { useQuery } from "@tanstack/react-query";
import CircularProgressBar from "../CircularProgressBar";
import { formatCompactNumber } from "@/utils/formatNumber";

const Stats = () => {
  const { webApp } = useContext(TelegramContext);

  const [stats, setStats] = useState<IStats>();
  const [isPending, setIspending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIspending(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/stats`
      );
      setStats(res.data?.stats as IStats);
      setIspending(false);
    })();
  }, []);
 

  
  if (isPending )
    return (
      <CircularProgressBar
        percentage={10}
        size={80}
        strokeWidth={12}
        color="white"
      />
    );
  return (
    <Container>
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex flex-col items-start justify-start mt-10">
          <div className="text-gray-light mix-blend-plus-lighter">
            Total balance
          </div>
          <h1 className="text-4xl font-black text-white">{stats && formatCompactNumber(stats?.totalPoints)}</h1>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-10">
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">
                Total Touches
              </div>
              <h1 className="text-3xl font-black text-white">
                {stats && formatCompactNumber(stats?.totalTouches)}
              </h1>
            </div>
          </div>
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">
                Total Players
              </div>
              <h1 className="text-3xl font-black text-white">
                {stats && formatCompactNumber(stats?.totalUsers)}
              </h1>
            </div>
          </div>
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">
                Daily Users
              </div>
              <h1 className="text-3xl font-black text-white">
                {stats && formatCompactNumber(stats?.dailyUsers)}
              </h1>
            </div>
          </div>
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">
                Online players
              </div>
              <h1 className="text-3xl font-black text-white">
                {stats && formatCompactNumber(stats?.onlineUsers)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Stats;
