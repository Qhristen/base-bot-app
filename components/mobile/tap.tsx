"use client";

import { BaseLogoSm, LightBolt } from "@/assets/icons";
import { TapGuruImage } from "@/assets/images";
import { TelegramContext } from "@/context/telegram-context";

import { getTapGuru } from "@/redux/feature/boost";
import {
  addTextPoints,
  fetchUser,
  incrementMiningLimit,
  incrementPoints,
  removePoint,
  setIsPressed,
  updateLimit,
  updateMiningInfo,
  updateScore,
  updateTapguru,
} from "@/redux/feature/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatCompactNumber } from "@/utils/formatNumber";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Container from "../container";
import { Progress } from "../ui/ProgressBar";

const Tap = () => {
  const { user, webApp } = useContext(TelegramContext);
  const dispatch = useAppDispatch();
  const {
    miningInfo,
    textPoints,
    isPressed,
    user: userData,
    status,
    pointCount,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(String(user?.id)));
  }, [dispatch, webApp, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (miningInfo.limit < miningInfo.max) {
        dispatch(incrementMiningLimit(userData?.refillSpeed));
        // dispatch(
        //   updateLimit({
        //     max: Number(miningInfo?.max),
        //     min: Number(miningInfo?.limit),
        //     userId: String(user?.id),
        //   })
        // );
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, miningInfo, user?.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userData && userData?.tapGuru.min !== 0) {
        dispatch(updateTapguru());
        dispatch(
          updateMiningInfo({
            perClick: userData.perclick,
          })
        );
      } else {
        clearInterval(interval);
      }
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, userData?.tapGuru]);

  const handleCoinTap = useCallback(
    (event: React.TouchEvent<HTMLImageElement>) => {
      event.preventDefault();
      if (miningInfo.limit !== 0) {
        // audio.play();

        const touchPoints = Array.from(event.touches)
          .slice(0, 5)
          .map((touch, index) => ({
            id: index,
            identifier: touch.identifier,
            clientX: touch.clientX,
            clientY: touch.clientY,
          }));

        dispatch(addTextPoints(touchPoints));
        dispatch(setIsPressed(true));
        dispatch(
          updateMiningInfo({
            limit: miningInfo.limit - miningInfo.perClick,
            status: "mining",
          })
        );
        // dispatch(incrementPoints(miningInfo.perClick));
        dispatch(
          updateScore({
            userId: String(user?.id),
            point: miningInfo.perClick,
          })
        );
        // touchPoints.forEach((touch) => {
        // });
      } else {
        dispatch(updateMiningInfo({ status: "stop" }));
        // webApp?.showAlert("Mining limit reached. Please try again later.");
      }
    },
    [dispatch, miningInfo]
  );

  const handleTouchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
    const endedTouches = Array.from(event.touches);

    const endedTouchPoints = endedTouches.map((touch, index) => ({
      id: index,
      identifier: touch.identifier,
      clientX: touch.clientX,
      clientY: touch.clientY,
    }));

    endedTouchPoints.forEach((touch) => {
      dispatch(setIsPressed(true));
      dispatch(
        updateScore({
          userId: String(user?.id),
          point: miningInfo.perClick,
        })
      );
    });
  };

  const handleRemovePoint = useCallback(
    (id: number) => {
      dispatch(removePoint(id));
    },
    [dispatch]
  );

  const transformStyle = useMemo(() => {
    if (!isPressed || !textPoints[0]) return "none";
    return `perspective(500px) rotateX(${
      (textPoints[0]?.clientY - window.innerHeight / 2) / 20
    }deg) rotateY(${(textPoints[0]?.clientX - window.innerWidth / 2) / 20}deg)`;
  }, [isPressed, textPoints]);

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
    <Container>
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="flex items-center tabular-nums text-white select-none">
              <Image src={LightBolt} alt="LightBolt" />
              <span className="text-lg font-bold select-none">
                {miningInfo.limit}
              </span>
              /{miningInfo.max}
            </span>
            <Progress
              className="tabular-nums"
              value={(miningInfo.limit / miningInfo.max) * 100}
            />
          </div>
          <div className="flex items-center gap-2 border border-white px-3 py-2 rounded-xl">
            {/* <div className="w-4 h-4">
              <Image src={`${userLeagueImage}`} alt="novice" />
            </div> */}
            <h2 className="text-white select-none">Connect wallet</h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center select-none mt-10">
          <div className="text-gray-light">My points</div>
          <h1 className="text-4xl font-black text-white">
            {formatCompactNumber(pointCount)}
          </h1>
        </div>
        <div className="relative flex items-center tabular-nums gap-0 justify-center mt-10 cursor-pointer overflow-hidden">
          <Image
            onTouchStart={handleCoinTap}
            onTouchEnd={handleTouchEnd}
            alt="logo"
            className="rounded-full z-20"
            src={BaseLogoSm}
            style={{ transform: transformStyle }}
          />
          {/* {userData?.tapGuru?.active && (
            <div className="absolute z-10">
              <Image alt="guru" className="" src={TapGuruImage} />
            </div>
          )} */}
          {textPoints.map((point) => (
            <div
              key={point.id}
              style={{
                left: `${point.clientX - 50}px`,
                top: `${point.clientY - 240}px`,
                zIndex: 60,
              }}
              className="absolute animate-floatUpAndFadeOut text-4xl text-white font-bold"
              onAnimationEnd={() => handleRemovePoint(point.id)}
            >
              +{miningInfo.perClick}
            </div>
          ))}
        </div>
        <h1 className="text-4xl text-white font-black text-center select-none mt-10">
          Tap
        </h1>
      </div>
    </Container>
  );
};

export default Tap;
