import MovileBottomNav from "@/components/mobile/bottom-nav";
import { TelegramProvider } from "@/context/telegram-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TelegramProvider>
      <div className="w-full h-full">
        {children}
        <MovileBottomNav />
      </div>
    </TelegramProvider>
  );
}
