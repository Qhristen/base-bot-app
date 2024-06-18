"use client";

import MobileLayout from "@/components/mobileLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <MobileLayout>{children}</MobileLayout>
    </div>
  );
}
