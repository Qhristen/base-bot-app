"use client";

import { TelegramContext } from "@/context/telegram-context";
import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import MovileBottomNav from "./mobile/bottom-nav";
import DesktopMessage from "./desktopMessage";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const { webApp } = useContext(TelegramContext);

  return (
    <div>
      {isMobile && webApp ? (
        <>
          {children}
          <MovileBottomNav />
        </>
      ) : (
        <DesktopMessage />
      )}
    </div>
  );
};

export default MobileLayout;
