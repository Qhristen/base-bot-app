"use client";

import React, { useContext } from "react";
import DesktopMessage from "./desktopMessage";
import MovileBottomNav from "./mobile/bottom-nav";
import { isMobile } from "react-device-detect";
import { TelegramContext } from "@/context/telegram-context";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(TelegramContext);

  return (
    <>
      <div className={`${isMobile ? "hidden" : "block"}`}>
        <DesktopMessage />
      </div>
      <div className={`${isMobile ? "block" : "hidden"} lg:hidden`}>
        {children}
        <MovileBottomNav />
      </div>
    </>
  );
};

export default MobileLayout;
