"use client";

import { ArcticonsCoinGold, LightBolt } from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useContext } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Container from "../container";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

const Boost = () => {
  const { user } = useContext(TelegramContext);

  const userID = user?.id;
  const { userData, loading: isUserPending } = useUser(String(userID));

  if (isUserPending)
    return (
      <CircularProgressBar
        percentage={10}
        size={80}
        strokeWidth={12}
        color="white"
      />
    );

  return (
    <Container>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="flex w-full h-full flex-col justify-between p-5 mb-40">
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="text-gray-light">Your coins</div>
          <h1 className="text-4xl font-black text-white">{userData?.points}</h1>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Daily bonus</h5>
          <div className="bg-gray rounded-2xl p-3">
            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                    <Image src={LightBolt} alt="LightBolt" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Full energy bar</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <span>
                        {userData?.fullEnergy.min}/{userData?.fullEnergy.max}
                      </span>
                    </div>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger className="bg-primary font-bold text-black text-lg hover:bg-primary/10 h-9 px-3 rounded-md">
                    Use
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Full energy bar</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="font-thin text-center">
                      Increase amount of TAP you can earn per one tap +1 per tap
                      for each level.
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                    <ArcticonsCoinGold className="fill-yellow stroke-white" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Taping Guru</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <span>
                        {userData?.tapGuru.min}/{userData?.tapGuru.max}
                      </span>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger className="bg-primary font-bold text-black text-lg hover:bg-primary/10 h-9 px-3 rounded-md">
                    Use
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Taping Guru</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="font-thin text-center">
                      Increase amount of TAP you can earn per one tap +1 per tap
                      for each level.
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Other bonus</h5>
          <div className="bg-gray rounded-2xl p-3">
            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                    <Image src={LightBolt} alt="LightBolt" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Multi tap</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <div className="flex items-center gap-0 text-white">
                        <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                        <span>500</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger className="bg-primary font-bold text-black text-lg hover:bg-primary/10 h-9 px-3 rounded-md">
                    Open
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Multi tap</DialogTitle>
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
                    <Button className="w-full" variant={`primary`} size={`lg`}>
                      Purchase
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Boost;
