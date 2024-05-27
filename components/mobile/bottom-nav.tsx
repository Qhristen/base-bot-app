"use client";

import {
  ArcticonsCoin,
  BoostIcon,
  GoogleTasksIcon,
  IconStat,
  MoneyBagIcon,
} from "@/assets/icons";
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
    title: "Earn",
    icon: MoneyBagIcon,
    link: "/mobile/earn",
  },
  {
    title: "Stats",
    icon: IconStat,
    link: "/mobile/stats",
  },
];
const MovileBottomNav = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bg-black bottom-0 right-0 left-0 flex justify-evenly gap-5 items-center p-4">
      {bottomNavs.map((nav, i) => (
        <Link key={i} href={nav.link}>
          <div
            className={cn(
              "flex scale-95 flex-col flex-grow justify-center items-center gap-1",
              pathname === nav.link &&
                "bg-gray px-4 py-2 w-full rounded-lg border-2 border-primary"
            )}
          >
            <nav.icon
              className={cn(
                "fill-white",
                pathname === nav.link &&
                  "fill-primary"
              )}
            />
            <div className="text-white">{nav.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovileBottomNav;
