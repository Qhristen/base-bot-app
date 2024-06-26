"use client";

import React from "react";
import DesktopMessage from "./desktopMessage";
import MovileBottomNav from "./mobile/bottom-nav";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopMessage />
      </div>
      <div className="block lg:hidden">
        {children}
        <MovileBottomNav />
      </div>
    </>
  );
};

export default MobileLayout;
