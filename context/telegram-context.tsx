"use client";

import { ITelegramUser, IWebApp } from "@/types";
import Script from "next/script";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/validate-init", {
      method: "POST",
      body: webApp?.initData,
    }).then((res) => res);
  }, [webApp?.initData]);

//   if (!webApp?.initDataUnsafe.query_id) {
//     alert('WebViewQueryId not defined');
//     return;
// }

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />

      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
