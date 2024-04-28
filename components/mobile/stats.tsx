import { LightBolt } from "@/assets/icons";
import Image from "next/image";
import React, { useContext } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import { TelegramContext, useTelegram } from "@/context/telegram-context";

const Stats = () => {
  // const { user, webApp } = useContext(TelegramContext);
  // console.log(user, "user");
  return (
    <Container>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex flex-col items-start justify-start mt-10">
          <div className="text-gray-light mix-blend-plus-lighter">Total balance</div>
          <h1 className="text-4xl font-black text-white">9.232 T</h1>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-10">
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">Total Touches</div>
              <h1 className="text-3xl font-black text-white">162 521 882</h1>
            </div>
          </div>
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">Total Players</div>
              <h1 className="text-3xl font-black text-white">7 650 487</h1>
            </div>
          </div>
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">Daily Users</div>
              <h1 className="text-3xl font-black text-white">2 936 626</h1>
            </div>
          </div>
          <div className="bg-gray rounded-xl p-4 py-6">
            <div className="flex flex-col items-start justify-start">
              <div className="text-gray mix-blend-plus-lighter">Online players</div>
              <h1 className="text-3xl font-black text-white">84 833</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Stats;
