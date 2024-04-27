import { LightBolt, TableUserFiled } from "@/assets/icons";
import { BaseLogoLg, NoviceBadge } from "@/assets/images";
import Image from "next/image";
import React, { useContext } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import { Progress } from "../ui/ProgressBar";
import { TelegramContext, useTelegram } from "@/context/telegram-context";

const Tap = () => {
  // const { user, webApp } = useContext(TelegramContext);
  // console.log(user, "user");
  return (
    <Container>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
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
          <div className="text-gray">Your coins</div>
          <h1 className="text-4xl font-black text-white">2521</h1>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Image alt="logo" src={BaseLogoLg} />
        </div>
        <h1 className="text-4xl text-white font-black mt-10 text-center">
          Tap
        </h1>
      </div>
    </Container>
  );
};

export default Tap;