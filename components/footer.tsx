import { TelegramIcon, TwitterIcon } from "@/assets/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex items-center text-white justify-between p-4 py-10 mb-10 lg:mb-0">
      <span className="font-bold">@2024 Base.</span>
      <div className="flex items-center gap-2">
        <Link href={`https://x.com/eraswap_`}>
        <TwitterIcon />
        </Link>
        <Link href={`https://t.me/taponbase`}>
        <TelegramIcon />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
