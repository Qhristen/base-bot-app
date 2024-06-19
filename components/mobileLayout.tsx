"use client";

import { TelegramContext } from "@/context/telegram-context";
import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import MovileBottomNav from "./mobile/bottom-nav";
import DesktopMessage from "./desktopMessage";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(TelegramContext);

  if (!isMobile && !user?.id)
    return (
      <>
        <DesktopMessage />
      </>
    );

  return (
    <>
      {children}
      <MovileBottomNav />
    </>
  );
};

export default MobileLayout;
