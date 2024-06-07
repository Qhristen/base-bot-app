import { Toaster } from "@/components/ui/toaster";
import { TelegramProvider } from "@/context/telegram-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import local from "next/font/local";
import "./globals.css";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });
const generalSans = local({
  src: [
    {
      path: "../assets/fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-generalSans",
});

export const metadata: Metadata = {
  title: "Base app",
  description: "Welcome to Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} ${inter.className}`}>
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
