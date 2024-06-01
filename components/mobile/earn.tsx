"use client";

import {
  ArcticonsCoin,
  ArrowRight,
  MoneyBagColoredIcon,
  ShareIcon,
  SpecialTaskIcon,
} from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/useUser";
import { SpecialTask } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Container from "../container";

const Earn = () => {
  const { user, webApp } = useContext(TelegramContext);
  const userID = user?.id;
  const { userData, loading: isUserPending } = useUser(String(userID));
  const { toast } = useToast();

  const { data: specialTask, isPending: isSpecialTaskPending } = useQuery({
    queryKey: ["specialTask"],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/special`)
        .then((response) => response.data?.data?.task as SpecialTask[]),
  });

  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast({description: "Referral link copied." });
  };


  if (isUserPending || isSpecialTaskPending)
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
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex flex-col items-start justify-start mt-7">
          <h1 className="text-4xl font-bold text-white">
            Earn more <br /> Basecoins
          </h1>
        </div>
        <div
          onClick={() => onCopy(userData?.referralLink as string)}
          className="bg-gray rounded-2xl p-4 mt-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                <MoneyBagColoredIcon className="scale-75" />
              </div>
              <div className="text-white">
                <h4 className="font-normal text-white">Invite bonus</h4>
                <div className="flex items-center gap-2 font-normal text-white">
                  <span className="text-sm">
                    Up to <span className="font-bold">30 000 </span>for a friend
                  </span>
                </div>
              </div>
            </div>
            <ShareIcon />
          </div>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Specials</h5>
          <div className="bg-gray rounded-2xl p-4">
            {specialTask?.map((data, i) => (
              <Link key={i} href={`/single-task/${data.id}`}>
                <div className="flex items-center justify-between my-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                      <Image src={SpecialTaskIcon} alt="LightBolt" />
                    </div>
                    <div className="text-white">
                      <h4 className="font-medium text-white">{data?.name}</h4>
                      <div className="flex items-center gap-2 font-bold text-white">
                        <ArcticonsCoin className="fill-yellow scale-95 stroke-white" />
                        <span>{data.point}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Earn;
