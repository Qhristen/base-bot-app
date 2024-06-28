"use client";

import React, { useContext } from "react";
import DesktopMessage from "./desktopMessage";
import MovileBottomNav from "./mobile/bottom-nav";
import { isMobile } from "react-device-detect";
import { TelegramContext } from "@/context/telegram-context";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const { webApp } = useContext(TelegramContext);

  return (
    <>
      {isMobile && webApp ? (
        <>
          {children}
          <MovileBottomNav />
        </>
      ) : (
        <DesktopMessage />
      )}
    </>
  );
};

export default MobileLayout;
