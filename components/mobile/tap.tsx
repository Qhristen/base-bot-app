"use client";

import { BaseLogoSm, LightBolt } from "@/assets/icons";
import { NoviceBadge } from "@/assets/images";
import { TelegramContext } from "@/context/telegram-context";
import Image from "next/image";
import { useContext, useEffect } from "react";
import Container from "../container";
import { Progress } from "../ui/ProgressBar";

const Tap = () => {
  const { user, webApp } = useContext(TelegramContext);
  console.log(webApp, "webApp");

  useEffect(() => {
    fetch("http://localhost:8000/api/validate-init", {
      method: "POST",
      body: webApp?.initData,
    }).then((res) => res.json());
  }, [webApp]);


  return (
    <Container>
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="flex items-center text-white">
              <Image src={LightBolt} alt="LightBolt" />
              <span className="text-lg font-bold "> 500</span>/500
            </span>
            <Progress value={100} />
          </div>
          <div className="flex items-center gap-2 bg-gray px-3 py-2 rounded-xl">
            <div className="w-4 h-4">
              <Image src={NoviceBadge} alt="novice" />
            </div>
            <h2 className="text-white">Novice</h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <div className="text-gray-light">Your coins</div>
          <h1 className="text-4xl font-black text-white">25231</h1>
        </div>
        <div className="flex items-center gap-0 justify-center mt-10">
          <BaseLogoSm />
        </div>
        <h1 className="text-4xl text-white font-black text-center mt-10">
          Tap
        </h1>
      </div>
    </Container>
  );
};

export default Tap;
