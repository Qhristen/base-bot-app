import Welcome from "@/components/mobile/welcome";
import { TelegramProvider } from "@/context/telegram-context";
import React from "react";

const page = () => {
  return (
    <TelegramProvider>
      <Welcome />
    </TelegramProvider>
  );
};

export default page;
