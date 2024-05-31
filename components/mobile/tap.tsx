"use client";

import { BaseLogoSm, LightBolt } from "@/assets/icons";
import { NoviceBadge } from "@/assets/images";
import { TelegramContext } from "@/context/telegram-context";

import { TouchPoint, User } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Container from "../container";
import { Progress } from "../ui/ProgressBar";
import CircularProgressBar from "../CircularProgressBar";

const Tap = () => {
  const { user, webApp } = useContext(TelegramContext);
  const userID = user && user?.id;
  const [userData, setUserData] = useState<User>();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  // const [audio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/216/216.wav'));

  const [isPressed, setIsPressed] = useState(false);
  const [miningInfo, setMiningInfo] = useState({
    status: "idle",
    perClick: 0,
    limit: 0,
    max: 0,
  });

  const [textPoints, setTextPoints] = useState<TouchPoint[]>([]);
  const [pointCount, setPointCount] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setUserLoading(true);
    (async () => {
      const req = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userID}`
      );
      const res = (await req.data.data.user) as User;
      setUserData(res);
      setPointCount(res.points);
      setMiningInfo({
        status: "mining",
        perClick: res?.perclick,
        limit: res?.limit,
        max: res?.max,
      });
      setUserLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMiningInfo((prevMiningInfo) => {
        if (prevMiningInfo.limit < prevMiningInfo.max) {
          return { ...prevMiningInfo, limit: prevMiningInfo.limit + 1 };
        } else {
          clearInterval(interval);
          return prevMiningInfo;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [miningInfo]);

  const updateScore = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user?.id}/add-point`,
        { point: counter }
      );
      console.log("Score was updated:", response.data);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  }, [user?.id, counter]);

  useEffect(() => {
    updateScore();
  }, [pointCount]);

  const handleCoinTap = useCallback(
    (event: React.TouchEvent<HTMLImageElement>) => {
      event.preventDefault();
      if (miningInfo.limit !== 0) {
        setIsPressed(true);
        setPointCount((prev) => prev + miningInfo.perClick);
        setCounter((prev) => prev + miningInfo.perClick);
        setMiningInfo((prevMiningInfo) => ({
          ...prevMiningInfo,
          limit: prevMiningInfo.limit - prevMiningInfo.perClick,
          status: "mining",
        }));
        // audio.play();
        const touchPoints = Array.from(event.touches)
          .slice(0, userData?.multiTap)
          .map((touch, index) => ({
            id: index,
            identifier: touch.identifier,
            clientX: touch.clientX,
            clientY: touch.clientY,
          }));

        setTextPoints((prevTouchPoints) => [
          ...prevTouchPoints,
          ...touchPoints,
        ]);
      } else {
        setMiningInfo((prevMiningInfo) => ({
          ...prevMiningInfo,
          status: "stop",
        }));
        // webApp?.showAlert("Mining limit reached. Please try again later.");
      }
    },
    [miningInfo, webApp]
  );

  const removePoint = useCallback((id: number) => {
    setTextPoints((prevTouchPoints) =>
      prevTouchPoints.filter((point) => point.id !== id)
    );
  }, []);

  const transformStyle = useMemo(() => {
    if (!isPressed || !textPoints[0]) return "none";
    return `perspective(500px) rotateX(${
      (textPoints[0]?.clientY - window.innerHeight / 2) / 20
    }deg) rotateY(${(textPoints[0]?.clientX - window.innerWidth / 2) / 20}deg)`;
  }, [isPressed, textPoints]);

  if (userLoading)
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
          <div className="flex items-center gap-2 bg-gray px-3 py-2 rounded-xl">
            <div className="w-4 h-4">
              <Image src={NoviceBadge} alt="novice" />
            </div>
            <h2 className="text-white select-none">{userData?.league}</h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center select-none mt-10">
          <div className="text-gray-light">Your coins</div>
          <h1 className="text-4xl font-black text-white">{pointCount}</h1>
        </div>
        <div className="relative flex items-center tabular-nums gap-0 justify-center mt-10 cursor-pointer overflow-hidden">
          <Image
            onTouchStart={handleCoinTap}
            onTouchEnd={() => setIsPressed(false)}
            alt="logo"
            className="rounded-full"
            src={BaseLogoSm}
            style={{ transform: transformStyle }}
          />
          {textPoints.map((point) => (
            <div
              key={point.id}
              style={{
                left: `${point.clientX - 50}px`,
                top: `${point.clientY - 240}px`,
              }}
              className="absolute animate-floatUpAndFadeOut text-4xl text-white font-bold"
              onAnimationEnd={() => removePoint(point.id)}
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
