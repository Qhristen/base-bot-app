"use client";

import { BaseLogoSm, TableUserFiled } from "@/assets/icons";
import { BaseLogoLg } from "@/assets/images";
import Image from "next/image";
import React, { useContext } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import Link from "next/link";
import { TelegramContext } from "@/context/telegram-context";

const Welcome = () => {
  const { user, webApp } = useContext(TelegramContext);

  return (
    <Container>
      <div className="flex w-full h-full flex-col justify-between text-white p-5 mb-40">
        {user ? (
          <div
            className="flex justify-center"
            onClick={async () => {
             webApp?.sendData(JSON.stringify({ data: "test" }));
            }}
          >
            <div className="flex gap-2 items-center w-max justify-center border-2 border-white rounded-2xl p-3">
              <TableUserFiled />
              <span>{user?.username}</span>
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-center mt-10">
          <BaseLogoSm />
          {/* <Image alt="logo" src={BaseLogoLg} /> */}
        </div>
        <div className="text-center mt-10">
          <h5 className="font-bold text-lg">Welcome to Base</h5>
          <p>Tap on the coin and see your balance rise</p>
        </div>
        <Link href={`/mobile/tap`}>
          <Button size={`lg`} className="w-full mt-20" variant={`primary`}>
            Get started
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Welcome;
