"use client";

import { BaseLogoSm, LightBolt } from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";

import {
  addTextPoints,
  fetchUser,
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
import intervalService from "@/utils/IntervalService";
import { getImageForUserLevel } from "@/utils/userLevel";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Container from "../container";
import TapGuruAnimation from "../tap-guru-animation";
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
    webApp?.expand();
  }, [dispatch, webApp, user]);

  useEffect(() => {
    if (miningInfo.limit < miningInfo.max && miningInfo.status === "mining") {
      intervalService.startInterval(Number(userData?.refillSpeed));
      dispatch(
        updateLimit({
          max: Number(miningInfo?.max),
          min: Number(miningInfo?.limit),
          userId: String(user?.id),
        })
      );
    } else {
      intervalService.stopInterval();
    }
    return () => {
      // intervalService.stopInterval();// dispatch(
      // dispatch(
      //   updateLimit({
      //     max: Number(miningInfo?.max),
      //     min: Number(miningInfo?.limit),
      //     userId: String(user?.id),
      //   })
      // );
    };
  }, [intervalService, miningInfo, userData?.refillSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTapguru());
      dispatch(
        updateMiningInfo({
          perClick: Number(userData && userData.perclick),
        })
      );
      // dispatch(
      //   getTapGuru({
      //     ...userData.tapGuru,
      //     active: false,
      //     userId: String(user?.id),
      //   })
      // );
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, [userData?.tapGuru.min, dispatch]);

  const handleCoinTap = (event: React.TouchEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (miningInfo.limit > 0) {
      // audio.play();
      dispatch(setIsPressed(true));
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
          ...miningInfo,
          limit: Math.max(
            0,
            Math.min(miningInfo.limit - miningInfo.perClick, miningInfo.max)
          ),
          status: "idle",
        })
      );
      const perTap = miningInfo.perClick * touchPoints.length;
      dispatch(incrementPoints(perTap));
      const debouncedUpdateScore = debounce(() => {
        dispatch(
          updateScore({
            userId: String(user?.id),
            point: perTap,
          })
        );
      }, 2000);

      debouncedUpdateScore();
    } else {
      dispatch(updateMiningInfo({ status: "stop" }));
      // webApp?.showAlert("Mining limit reached, buy more refill speed.");
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLImageElement>) => {
    dispatch(setIsPressed(false));
    dispatch(
      updateMiningInfo({
        status: "mining",
      })
    );
  };

  const handleRemovePoint = useCallback(
    (id: number) => {
      dispatch(removePoint(id));
    },
    [dispatch]
  );

  const userLeagueImage =
    userData && getImageForUserLevel(`${userData?.league.toLowerCase()}`);

  // Calculate perspective origin based on the average of touch points
  const originX =
    textPoints.reduce((acc, touch) => acc + touch.clientX, 0) /
    textPoints.length;
  const originY =
    textPoints.reduce((acc, touch) => acc + touch.clientY, 0) /
    textPoints.length;

  const transformStyle = useMemo(() => {
    if (!isPressed || !textPoints) return "none";
    return `perspective(500px) rotateX(${
      (originY - window.innerHeight / 2) / 20
    }deg) rotateY(${(originX - window.innerWidth / 2) / 20}deg)`;
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
      <div className="flex w-full h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="flex items-center tabular-nums text-white select-none">
              <Image src={LightBolt} alt="LightBolt" />
              <span className="text-lg font-bold select-none">
                {Math.max(0, Math.min(miningInfo.limit, miningInfo.max))}
              </span>
              /{miningInfo.max}
            </span>
            <Progress
              className="tabular-nums"
              value={(miningInfo.limit / miningInfo.max) * 100}
            />
          </div>
          <div className="flex items-center gap-2 bg-gray px-3 py-2 rounded-xl">
            <div className="w-7 h-7">
              <Image src={`${userLeagueImage}`} alt="novice" />
            </div>
            <h2 className="text-white capitalize">{userData?.league}</h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center select-none mt-10">
          <div className="text-gray-light">My points</div>
          <motion.div
            key={pointCount}
            initial={{ scale: 1 }}
            animate={{ scale: 1.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-black text-white">
              {formatCompactNumber(pointCount)}
            </h1>
          </motion.div>
        </div>
        <div className="relative flex items-center tabular-nums gap-0 justify-center mt-10 cursor-pointer overflow-hidden">
          <Image
            onTouchStart={handleCoinTap}
            onTouchEnd={handleTouchEnd}
            alt="logo"
            className="rounded-full z-20 scale-100"
            src={BaseLogoSm}
            // aria-disabled={miningInfo.limit <= 0}
            style={{ transform: transformStyle }}
          />
          {userData && userData?.perclick * 5 === miningInfo.perClick && (
            <TapGuruAnimation />
          )}

          {textPoints.map((point) => (
            <div
              key={point.id}
              style={{
                left: `${point.clientX - 50}px`,
                top: `${point.clientY - 230}px`,
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
