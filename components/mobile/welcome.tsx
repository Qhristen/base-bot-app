"use client";

import { BaseLogoSm, TableUserFiled } from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import CircularProgressBar from "../CircularProgressBar";

const Welcome = () => {
  const { webApp, user } = useContext(TelegramContext);
  const router = useRouter();

  useEffect(() => {
    const hasSeenPage = localStorage.getItem("hasSeenPage");
    if (hasSeenPage) {
      router.push(`/mobile/tap`);
    }
    webApp?.expand();
  }, [router, webApp]);

  return (
    <Container>
      <div className="flex w-full h-full flex-col justify-between text-white p-5 mb-40">
        {user ? (
          <div className="flex justify-center">
            <div className="flex gap-2 items-center w-max justify-center border-2 border-white rounded-2xl p-3">
              <TableUserFiled />
              <span>{user?.username}</span>
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-center mt-10">
          {/* <BaseLogoSm /> */}
          <Image alt="logo" src={BaseLogoSm} />
        </div>
        <div className="text-center mt-10">
          <h5 className="font-bold text-lg">Welcome to Eraswap</h5>
          <p>Bop on the screen and watch your score rise</p>
        </div>
        <Link href={`/mobile/tap`}>
          <Button
            onClick={() => localStorage.setItem("hasSeenPage", "true")}
            size={`lg`}
            className="w-full mt-20"
            variant={`primary`}
          >
            Get started
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Welcome;
