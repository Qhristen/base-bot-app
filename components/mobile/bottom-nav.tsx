"use client";

import {
  ArcticonsCoin,
  BoostIcon,
  GoogleTasksIcon,
  IconStat,
  MoneyBagIcon,
} from "@/assets/icons";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { SVGProps } from "react";

interface INav {
  title: string;
  icon: React.FC<SVGProps<SVGElement>>;
  link: string;
}

const bottomNavs: INav[] = [
  {
    title: "Tap",
    icon: ArcticonsCoin,
    link: "/mobile/tap",
  },
  {
    title: "Task",
    icon: GoogleTasksIcon,
    link: "/mobile/task",
  },
  {
    title: "Boost",
    icon: BoostIcon,
    link: "/mobile/boost",
  },
  {
    title: "Stats",
    icon: IconStat,
    link: "/mobile/stats",
  },
  {
    title: "Swap",
    icon: MoneyBagIcon,
    link: "/mobile/swap",
  },
];
const MovileBottomNav = () => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="fixed bg-black z-30 bottom-0 right-0 left-0 flex justify-evenly gap-5 items-center p-4">
      {bottomNavs.map((nav, i) => (
        <Link key={i} href={nav.link} className="relative inline-flex w-fit">
          <div
            className={cn(
              "flex scale-95 flex-col flex-grow justify-center items-center gap-1",
              pathname === nav.link &&
                "bg-gray px-4 py-2 w-full rounded-lg border-2 border-primary"
            )}
          >
            <nav.icon className={cn("fill-primary")} />
            <div className="text-white">{nav.title}</div>
          </div>
          {nav.title === "Task" && (
            <>
              {user &&
                user?.isLeagueDone &&
                user?.isRefDone &&
                user?.isSpecialDOne ? "" : (
                  <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1 text-xs"></div>
                )}
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default MovileBottomNav;
