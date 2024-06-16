"use client";

import {
  ArcticonsCoinGold,
  AutoBotIcon,
  LightBolt,
  MutitapIcon,
  RefillSpeedIcon,
} from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import {
  claimAutoBotPoints,
  getFullEnergy,
  getTapGuru,
  purchaseAutoBot,
  upadteMultitap,
  updateChargeLimit,
  updateRefillSpeed,
} from "@/redux/feature/boost";
import { fetchUser } from "@/redux/feature/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatCompactNumber } from "@/utils/formatNumber";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
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
  const { user, webApp } = useContext(TelegramContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: userData, status } = useAppSelector((state) => state.user);
  const { status: boostStatus } = useAppSelector((state) => state.boost);

  useEffect(() => {
    dispatch(fetchUser(String(user?.id)));
  }, [dispatch, webApp, user]);

  if (status === "loading" || boostStatus === "loading")
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
          <div className="text-gray-light">My points</div>
          <h1 className="text-4xl font-black text-white">
            {userData && formatCompactNumber(userData?.totalPoint)}
          </h1>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Daily Free Boosters</h5>
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
                        {userData?.fullEnergy?.min}/{userData?.fullEnergy?.max}
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
                      {/* <div className="flex items-center justify-center py-4">
                        <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-gray">
                          <Image src={RefillSpeedIcon} alt="LightBolt" />
                        </div>
                      </div> */}
                      {/* <div className="font-thin text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-0 text-white">
                            <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                            <span>{userData?.max}</span>
                          </div>
                        </div>
                      </div> */}
                      <DialogDescription className="font-thin text-center">
                        Fill your energy to the max
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={async () => {
                        if (userData?.fullEnergy?.min !== 0) {
                          await dispatch(
                            getFullEnergy({
                              min: Number(
                                userData?.fullEnergy?.min &&
                                  userData?.fullEnergy?.min - 1
                              ),
                              limit: Number(userData?.max),
                              max: Number(userData?.fullEnergy?.max),
                              active: true,
                              userId: String(user?.id),
                            })
                          );
                          router.push(`/mobile/tap`);
                        } else {
                          webApp?.showAlert("You have exceeded your limit");
                        }
                      }}
                      className="w-full"
                      variant={`primary`}
                      size={`lg`}
                    >
                      Get it
                    </Button>
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
                        {userData?.tapGuru?.min}/{userData?.tapGuru?.max}
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
                      {/* <div className="flex items-center justify-center py-4">
                        <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-gray">
                          <Image src={RefillSpeedIcon} alt="LightBolt" />
                        </div>
                      </div> */}
                      {/* <div className="font-thin text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-0 text-white">
                            <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                            <span>{userData?.max}</span>
                          </div>
                        
                        </div>
                      </div> */}
                      <DialogDescription className="font-thin text-center">
                        Multiply your tap income by x5 for 20 seconds.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() => {
                        if (userData?.tapGuru?.min !== 0) {
                          dispatch(
                            getTapGuru({
                              min: Number(
                                userData?.tapGuru?.min && userData?.tapGuru?.min
                              ),
                              max: Number(userData?.tapGuru?.max),
                              active: true,
                              userId: String(user?.id),
                            })
                          );
                          router.push(`/mobile/tap`);
                        } else {
                          webApp?.showAlert("You have exceeded your limit");
                        }
                      }}
                      className="w-full"
                      variant={`primary`}
                      size={`lg`}
                    >
                      Get it
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h5 className="font-medium text-white py-2">Boosters</h5>
          <div className="bg-gray rounded-2xl p-3">
            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-3 w-10 h-10 rounded-full bg-gray">
                    <Image src={MutitapIcon} alt="LightBolt" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Multi Bop</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <div className="flex items-center gap-0 text-white">
                        <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                        <span>{userData?.multiTapPoint}</span>
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
                      <DialogTitle>Multi Bop</DialogTitle>
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center justify-center w-10 h-10 p-3 rounded-full bg-gray">
                          <Image src={MutitapIcon} alt="LightBolt" />
                        </div>
                      </div>
                      <div className="font-thin text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-0 text-white">
                            <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                            <span>{userData?.multiTapPoint}</span>
                          </div>
                          <div className="flex items-center gap-0">
                            <div className="flex items-center justify-center w-4 h-4 rounded-full p-0.5 bg-white text-black">
                              {userData?.multiTapLevel}
                            </div>
                            <span className="p-1">Level</span>
                          </div>
                        </div>
                      </div>
                      <DialogDescription className="font-thin text-center">
                        Increase the number of bop you can earn in one tap for
                        each level
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() => {
                        if (
                          userData &&
                          userData?.totalPoint >= userData?.multiTapPoint
                        ) {
                          dispatch(
                            upadteMultitap({
                              userId: String(user?.id),
                              point: Number(userData?.multiTapPoint) * 2,
                            })
                          );
                          dispatch(fetchUser(String(user?.id)));
                        } else {
                          webApp?.showAlert(
                            "You do not have enough point to update multi bop."
                          );
                        }
                      }}
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
            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                    <Image src={LightBolt} alt="LightBolt" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Charge Limit</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <div className="flex items-center gap-0 text-white">
                        <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                        <span>
                          {" "}
                          {userData && userData?.max * 2}
                        </span>
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
                      <DialogTitle>Charge Limit</DialogTitle>
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                          <Image src={LightBolt} alt="LightBolt" />
                        </div>
                      </div>
                      <div className="font-thin text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-0 text-white">
                            <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                            <span>
                              {userData &&
                                userData?.max * 2}
                            </span>
                          </div>
                          <div className="flex items-center gap-0">
                            <div className="flex items-center justify-center w-4 h-4 rounded-full p-0.5 bg-white text-black">
                              {userData?.chargeLevel}
                            </div>
                            <span className="p-1">Level</span>
                          </div>
                        </div>
                      </div>
                      <DialogDescription className="font-thin text-center">
                        Increase the number of bop you can earn in one tap for
                        each level
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() => {
                        if (userData && userData?.totalPoint >= userData?.max) {
                          dispatch(
                            updateChargeLimit({
                              userId: String(user?.id),
                              limit: Number(userData?.max) * 2,
                              point: Number(userData?.max),
                            })
                          );
                          dispatch(fetchUser(String(user?.id)));
                        } else {
                          webApp?.showAlert(
                            "You do not have enough point to increase charge limit."
                          );
                        }
                      }}
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

            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-gray">
                    <Image src={RefillSpeedIcon} alt="LightBolt" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Refill speed</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <div className="flex items-center gap-0 text-white">
                        <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                        <span>{userData?.refillPoint}</span>
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
                      <DialogTitle>Refill speed</DialogTitle>
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-gray">
                          <Image src={RefillSpeedIcon} alt="LightBolt" />
                        </div>
                      </div>
                      <div className="font-thin text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-0 text-white">
                            <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                            <span>{userData?.refillPoint}</span>
                          </div>
                          <div className="flex items-center gap-0">
                            <div className="flex items-center justify-center w-4 h-4 rounded-full p-0.5 bg-white text-black">
                              {userData?.refillLevel}
                            </div>
                            <span className="p-1">Level</span>
                          </div>
                        </div>
                      </div>
                      <DialogDescription className="font-thin text-center">
                        Increase the number of bop you can earn in one tap for
                        each level
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      onClick={() => {
                        if (
                          userData &&
                          userData?.totalPoint >= userData?.refillPoint
                        ) {
                          dispatch(
                            updateRefillSpeed({
                              userId: String(user?.id),
                              speed: Number(userData?.refillSpeed) + 1,
                              point: Number(userData?.refillPoint),
                            })
                          );
                          dispatch(fetchUser(String(user?.id)));
                        } else {
                          webApp?.showAlert(
                            "You do not have enough point to refill speed."
                          );
                        }
                      }}
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

            <div className="my-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-gray">
                    <Image src={AutoBotIcon} alt="LightBolt" />
                  </div>
                  <div className="text-white">
                    <h4 className="font-medium text-white">Auto tap bot</h4>
                    <div className="flex items-center gap-2 font-normal text-white">
                      <div className="flex items-center gap-0 text-white">
                        <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                        <span>500 000</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Dialog
                  defaultOpen={
                    userData && userData?.autoBotpoints > 40000 ? true : false
                  }
                >
                  <DialogTrigger
                    disabled={userData?.autobot}
                    className="bg-primary font-bold text-black text-lg hover:bg-primary/10 h-9 px-3 rounded-md disabled:pointer-events-none disabled:opacity-50"
                  >
                    Open
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Auto tap bot</DialogTitle>
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center justify-center p-2 w-10 h-10 rounded-full bg-gray">
                          <Image src={AutoBotIcon} alt="LightBolt" />
                        </div>
                      </div>
                      <div className="font-thin text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-0 text-white">
                            <ArcticonsCoinGold className="fill-yellow scale-95 stroke-white" />
                            <span>
                              {" "}
                              {userData?.autobot
                                ? userData?.autoBotpoints
                                : `500 000`}
                            </span>
                          </div>
                          {/* <div className="flex items-center gap-0">
                            <div className="flex items-center justify-center w-4 h-4 rounded-full p-0.5 bg-white text-black">
                              {userData?.autoBotpoints}
                            </div>
                            <span className="p-1"></span>
                          </div> */}
                        </div>
                      </div>
                      <DialogDescription className="font-thin text-center">
                        Increase the number of bop with Auto bot
                      </DialogDescription>
                    </DialogHeader>

                    {userData?.autobot ? (
                      <Button
                        onClick={() => {
                          if (userData && userData?.autoBotpoints >= 40000) {
                            dispatch(
                              claimAutoBotPoints({
                                userId: String(user?.id),
                                point: userData.autoBotpoints,
                              })
                            );
                            dispatch(fetchUser(String(user?.id)));

                          } else {
                            webApp?.showAlert(
                              "You do not have enough Auto bot point to claim."
                            );
                          }
                        }}
                        className="w-full"
                        variant={`primary`}
                        size={`lg`}
                        disabled={
                          userData && userData?.autoBotpoints > 40000 ? false : true
                        }
                      >
                        Claim points
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          if (userData && userData?.totalPoint >= 500000) {
                            dispatch(
                              purchaseAutoBot({
                                userId: String(user?.id),
                                point: 500000,
                              })
                            );
                            dispatch(fetchUser(String(user?.id)));

                          } else {
                            webApp?.showAlert(
                              "You do not have enough point to purchase Auto bot."
                            );
                          }
                        }}
                        className="w-full"
                        variant={`primary`}
                        size={`lg`}
                      >
                        Purchase
                      </Button>
                    )}
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
