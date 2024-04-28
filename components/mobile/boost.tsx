import { ArcticonsCoinGold, LightBolt } from "@/assets/icons";
import Image from "next/image";
import React, { useContext } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import { TelegramContext, useTelegram } from "@/context/telegram-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

const Boost = () => {
  // const { user, webApp } = useContext(TelegramContext);
  // console.log(user, "user");
  return (
    <Container>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="text-gray-light">Your coins</div>
          <h1 className="text-4xl font-black text-white">2521</h1>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Active bonus</h5>
          <div className="bg-gray rounded-2xl p-3">
            {Array.from({ length: 3 }).map((data, i) => (
              <div key={i} className="my-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                      <Image src={LightBolt} alt="LightBolt" />
                    </div>
                    <div className="text-white">
                      <h4 className="font-medium text-white">
                        Full energy bar
                      </h4>
                      <div className="flex items-center gap-2 font-normal text-white">
                        <span>3/3</span>
                      </div>
                    </div>
                  </div>
                  <Button size={`sm`} variant={`primary`}>
                    Use
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Other bonus</h5>
          <div className="bg-gray rounded-2xl p-3">
            {Array.from({ length: 3 }).map((data, i) => (
              <div key={i} className="my-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                      <Image src={LightBolt} alt="LightBolt" />
                    </div>
                    <div className="text-white">
                      <h4 className="font-medium text-white">
                        Full energy bar
                      </h4>
                      <div className="flex items-center gap-2 font-normal text-white">
                        <span>3/3</span>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger className="bg-primary font-bold text-black text-lg hover:bg-primary/10 h-9 px-3 rounded-md">
                      Open
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Multitap</DialogTitle>
                        <div className="flex items-center justify-center py-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                            <Image src={LightBolt} alt="LightBolt" />
                          </div>
                        </div>
                        <div className="font-thin text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex items-center gap-0 text-white">
                              <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                              <span>500</span> 
                            </div>
                            <div className="flex items-center gap-0">
                              <div className="flex items-center justify-center w-4 h-4 rounded-full p-0.5 bg-white text-black">
                                1
                              </div>
                              <span>Level</span>
                            </div>
                          </div>
                        </div>
                        <DialogDescription className="font-thin text-center">
                          Increase amount of TAP you can earn per one tap +1 per
                          tap for each level.
                        </DialogDescription>
                      </DialogHeader>
                      <Button
                        className="w-full"
                        variant={`primary`}
                        size={`lg`}
                      >
                        Purchase
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Boost;
