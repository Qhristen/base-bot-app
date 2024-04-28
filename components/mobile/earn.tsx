import {
  ArrowRight,
  LightBolt,
  MoneyBagColoredIcon,
  ShareIcon,
} from "@/assets/icons";
import Image from "next/image";
import React, { useContext } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import { TelegramContext, useTelegram } from "@/context/telegram-context";

const Earn = () => {
  // const { user, webApp } = useContext(TelegramContext);
  // console.log(user, "user");
  return (
    <Container>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex flex-col items-start justify-start mt-7">
          <h1 className="text-4xl font-bold text-white">Earn more <br /> Dotcoins</h1>
        </div>
        <div className="bg-gray rounded-2xl p-4 mt-10">
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
            {Array.from({ length: 6 }).map((data, i) => (
              <div key={i} className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                    <Image src={LightBolt} alt="LightBolt" />
                  </div>{" "}
                  <div className="text-white">
                    <h4 className="font-medium text-white">
                      Register on Whale
                    </h4>
                    <div className="flex items-center gap-2 font-bold text-white">
                      <span>+50 000</span>
                    </div>
                  </div>
                </div>
                <ArrowRight />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Earn;
