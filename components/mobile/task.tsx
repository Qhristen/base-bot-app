import {
  ArcticonsCoin,
  ArrowRight,
  LightBolt,
  TableUserFiled,
} from "@/assets/icons";
import { BaseLogoLg, NoviceBadge } from "@/assets/images";
import Image from "next/image";
import React, { useContext } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import { Progress } from "../ui/ProgressBar";
import { TelegramContext, useTelegram } from "@/context/telegram-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tab";
import Link from "next/link";

const Task = () => {
  // const { user, webApp } = useContext(TelegramContext);
  // console.log(user, "user");
  return (
    <Container>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <div className="text-gray-light">Your coins</div>
            <h1 className="text-2xl font-black text-white">2521</h1>
          </div>

          <Link href={`/badges`}>
            <div className="flex items-center gap-2 bg-gray px-3 py-2 rounded-xl">
              <div className="w-4 h-4">
                <Image src={NoviceBadge} alt="novice" />
              </div>
              <h2 className="text-white">Novice</h2>
            </div>
          </Link>
        </div>

        <Tabs defaultValue="special" className="w-full mt-10">
          <TabsList className="flex itens justify-between mb-5">
            <TabsTrigger value="special">Special</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="ref">Ref Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="special">
            <div className="bg-gray rounded-2xl p-3">
              {Array.from({ length: 3 }).map((data, i) => (
                <Link key={i} href={`/single-task`}>
                  <div className="flex items-center justify-between my-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray"></div>
                      <div className="text-white">
                        <h4 className="font-medium text-white">
                          Join Our Socials
                        </h4>
                        <div className="flex items-center gap-2 font-bold text-white">
                          <ArcticonsCoin className="fill-yellow scale-95 stroke-white" />
                          <span>200 000</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight />
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="leagues">
            <div className="bg-gray rounded-2xl p-3">
              {Array.from({ length: 3 }).map((data, i) => (
                <div key={i} className="my-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray"></div>
                      <div className="text-white">
                        <h4 className="font-medium text-white">Bonze</h4>
                        <div className="flex items-center gap-2 font-bold text-white">
                          <ArcticonsCoin className="fill-yellow scale-95 stroke-white" />
                          <span>1 000</span>
                        </div>
                      </div>
                    </div>
                    <Button size={`sm`} variant={`primary`}>
                      Claim
                    </Button>
                  </div>
                  <Progress className="my-2" value={30} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ref">
            <div className="bg-gray rounded-2xl p-3">
              {Array.from({ length: 5 }).map((data, i) => (
                <div key={i} className="my-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray"></div>
                      <div className="text-white">
                        <h4 className="font-medium text-white">Bonze</h4>
                        <div className="flex items-center gap-2 font-bold text-white">
                          <ArcticonsCoin className="fill-yellow scale-95 stroke-white" />
                          <span>1 000</span>
                        </div>
                      </div>
                    </div>
                    <Button size={`sm`} variant={`primary`}>
                      Claim
                    </Button>
                  </div>
                  <Progress className="my-2" value={30} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default Task;
