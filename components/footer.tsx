import { LogoIcon, TelegramIcon, TwitterIcon } from "@/assets/icons";
import React from "react";
import { Button } from "./ui/Button";

const Footer = () => {
  return (
    <div className="flex items-center text-white justify-between p-4 py-10 mb-10 lg:mb-0">
      <span className="font-bold">@2024 Base.</span>
      <div className="flex items-center gap-2">
        <TwitterIcon />
        <TelegramIcon />
      </div>
    </div>
  );
};

export default Footer;
