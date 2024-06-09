"use client";

import { ArrowLeft } from "@/assets/icons";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Carousel from "./ui/Carousel";
import Image from "next/image";
import { NoviceBadge } from "@/assets/images";
import { Progress } from "./ui/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBadges, fetchUser } from "@/redux/feature/user";
import { TelegramContext } from "@/context/telegram-context";
import { getImageForUserLevel } from "@/utils/userLevel";
import CircularProgressBar from "./CircularProgressBar";

const Badges = () => {
  const { user, webApp } = useContext(TelegramContext);
  const dispatch = useAppDispatch();
  const {
    user: userData,
    badges,
    status,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(String(user?.id)));
    dispatch(fetchBadges());
  }, [dispatch, webApp, user]);

  if (status === "loading")
    return (
      <CircularProgressBar
        percentage={10}
        size={80}
        strokeWidth={12}
        color="white"
      />
    );

  return (
    <div>
      <div className="text-white p-5">
        <div className="flex items-center justify-start py-4">
          <Link href={`/mobile/task`}>
            <ArrowLeft />
          </Link>
        </div>

        <Carousel responsive={{ desktop: 1, mobile: 1, tablet: 1 }}>
          {badges?.map((badge, i) => (
            <div>
              <div className="text-center py-10">
                <h1 className="text-2xl capitalize font-extrabold py-3">
                  {badge.name} League
                </h1>
                <p className="text-gray-light">
                  The number of points you accumulate determines your league{" "}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={getImageForUserLevel(`${badge.name.toLowerCase()}`)}
                  width={400}
                  height={400}
                  alt={getImageForUserLevel(`${badge.name.toLowerCase()}`)}
                />
              </div>

              <div className="text-center py-10">
                <div className="py-2">
                  {userData?.points}/{badge.points}
                </div>
                <Progress
                  className="h-4"
                  value={Number(
                    (
                      userData && (userData?.points / badge.points) * 100
                    )?.toFixed(2)
                  )}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Badges;
