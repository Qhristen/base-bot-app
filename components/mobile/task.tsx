"use client";

import {
  ArcticonsCoin,
  ArrowRight,
  MoneyBagColoredIcon,
  OnePerson,
  ShareIcon,
  SpecialTaskIcon,
  ThreePeople,
  TwoPeople,
} from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import { useUser } from "@/hooks/useUser";
import { League_Task, Ref_Task, SpecialTask, User } from "@/types";
import { formatCompactNumber } from "@/utils/formatNumber";
import { getImageForUserLevel } from "@/utils/userLevel";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Container from "../container";
import { Button } from "../ui/Button";
import { Progress } from "../ui/ProgressBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tab";
import { toast, useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  claimLeaguePoint,
  claimRefPoint,
  fetchAlluserTask,
  fetchLeagueTask,
  fetchRefTask,
  fetchSpecialTask,
} from "@/redux/feature/task";
import { fetchUser } from "@/redux/feature/user";
import Referrals from "./referrals";

const Task = () => {
  const { user, webApp } = useContext(TelegramContext);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { leagueTask, refTask, specialTask, status, userTasks } =
    useAppSelector((state) => state.task);
  const {
    user: userData,
    status: userStatus,
    badges,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(String(user?.id)));
  }, [dispatch, webApp, user]);

  useEffect(() => {
    dispatch(fetchRefTask());
    dispatch(fetchLeagueTask());
    dispatch(fetchSpecialTask());
    dispatch(fetchAlluserTask());
  }, [dispatch]);

  const userLeagueImage =
    userData && getImageForUserLevel(`${userData?.league.toLowerCase()}`);

  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast({ description: "Referral link copied." });
  };

  const isCompletedLeagueTask = (taskId: string) => {
    if (!userTasks) return;

    const checkTask = userTasks.find(
      (userT) => userT.taskId === taskId && userT.type === "league"
    );

    return checkTask ? true : false;
  };

  const isCompletedRefTask = (taskId: string) => {
    if (!userTasks) return;

    const checkTask = userTasks.find(
      (userT) => userT.taskId === taskId && userT.type === "ref"
    );

    return checkTask ? true : false;
  };

  if (status === "loading" || userStatus === "loading")
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
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <div className="text-gray-light">My points</div>
            <h1 className="text-2xl font-black text-white">
              {userData && formatCompactNumber(userData?.totalPoint)}
            </h1>
          </div>

          <Link href={`/badges`}>
            <div className="flex items-center gap-2 bg-gray px-3 py-2 rounded-xl">
              <div className="w-7 h-7">
                <Image src={`${userLeagueImage}`} alt="novice" />
              </div>
              <h2 className="text-white capitalize">{userData?.league}</h2>
            </div>
          </Link>
        </div>
        <Tabs defaultValue="special" className="w-full mt-10">
          <TabsList className="flex itens justify-between mb-5">
            <TabsTrigger value="special">Special</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="ref">Ref Tasks</TabsTrigger>
            <TabsTrigger value="referral">Refferrals</TabsTrigger>
          </TabsList>
          <TabsContent value="special">
            <div className="bg-gray rounded-2xl p-3">
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
          </TabsContent>
          <TabsContent value="leagues">
            <div className="bg-gray rounded-2xl p-3">
              {leagueTask
                ?.filter((leag) => leag.name !== "Novice")
                ?.map((data, i) => {
                  const LeagueImage = getImageForUserLevel(
                    `${data.name.toLowerCase()}`
                  );

                  const progress =
                    userData && (userData?.points / data.point) * 100;
                  return (
                    <div key={i} className="my-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                            <Image src={LeagueImage} alt="user" />
                          </div>
                          <div className="text-white">
                            <h4 className="font-medium text-white">
                              {data.name}
                            </h4>
                            <div className="flex items-center gap-2 font-bold text-white">
                              <ArcticonsCoin className="fill-yellow scale-95 stroke-white" />
                              <span>{data?.point}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            dispatch(
                              claimLeaguePoint({
                                name: data.name,
                                taskId: data?.id,
                                userId: String(user?.id),
                                status: "completed",
                                point: data?.point,
                                type: "league",
                              })
                            );
                            dispatch(fetchUser(String(user?.id)));
                            dispatch(fetchAlluserTask());
                          }}
                          disabled={
                            userData?.league.trim().toLowerCase() !==
                            data.name.trim().toLowerCase()
                              ? true
                              : isCompletedLeagueTask(data.id)
                              ? true
                              : false
                          }
                          size={`sm`}
                          variant={`primary`}
                        >
                          Claim
                        </Button>
                      </div>
                      <Progress
                        className="my-2"
                        value={Number(Number(progress).toFixed(2))}
                      />
                    </div>
                  );
                })}
            </div>
          </TabsContent>
          <TabsContent value="ref">
            <div className="bg-gray rounded-2xl p-3">
              {refTask?.map((data, i) => {
                const progress =
                  userData &&
                  (userData?.friendsReferred / data.totalInvite) * 100;
                return (
                  <div key={i} className="my-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                          <Image
                            src={
                              data.point <= 30000
                                ? OnePerson
                                : data.point <= 100000
                                ? TwoPeople
                                : ThreePeople
                            }
                            alt="user"
                          />
                        </div>
                        <div className="text-white">
                          <h4 className="font-medium text-white">
                            {data.name}
                          </h4>
                          <div className="flex items-center gap-2 font-bold text-white">
                            <ArcticonsCoin className="fill-yellow scale-95 stroke-white" />
                            <span>{data.point}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          dispatch(
                            claimRefPoint({
                              name: data.name,
                              taskId: data?.id,
                              userId: String(user?.id),
                              status: "completed",
                              point: data?.point,
                              type: "ref",
                            })
                          );
                          dispatch(fetchAlluserTask());
                          dispatch(fetchUser(String(user?.id)));

                        }}
                        disabled={
                          data.totalInvite === userData?.friendsReferred
                            ? isCompletedRefTask(data.id)
                              ? true
                              : false
                            : true
                        }
                        size={`sm`}
                        variant={`primary`}
                      >
                        Claim
                      </Button>
                    </div>
                    <Progress
                      className="my-2"
                      value={Number(progress?.toFixed(2))}
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="referral">
            <Referrals />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default Task;
