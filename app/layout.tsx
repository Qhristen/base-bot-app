import { Toaster } from "@/components/ui/toaster";
import { TelegramProvider } from "@/context/telegram-context";
import type { Metadata } from "next";
import { Sarala } from "next/font/google";
import local from "next/font/local";
import "./globals.css";
import { Providers } from "@/redux/provider";
import Head from "next/head";

const sarala = Sarala({
  subsets: ["latin"],
  weight: ["400", "700", "400", "700"],
});

export const metadata: Metadata = {
  title: "Base app",
  description: "Welcome to Base",
  other: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      <body className={`${sarala.className}`}>
        <TelegramProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </TelegramProvider>
      </body>
    </html>
  );
}
