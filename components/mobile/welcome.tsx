"use client";

import { BaseLogoSm, TableUserFiled } from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Container from "../container";
import { Button } from "../ui/Button";
import CircularProgressBar from "../CircularProgressBar";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser, welcomePageUpdate } from "@/redux/feature/user";

const Welcome = () => {
  const { webApp, user } = useContext(TelegramContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: userData, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(String(user?.id)));
    webApp?.expand();
  }, [dispatch, webApp, user]);


  if (userData?.welcomePage) redirect(`/mobile/tap`)

  if (status === "loading")
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
      <div className="flex w-full h-full flex-col justify-between text-white p-5 mb-40">
        {user ? (
          <div className="flex justify-center">
            <div className="flex gap-2 items-center w-max justify-center border-2 border-white rounded-2xl p-3">
              <TableUserFiled />
              <span>{user?.username}</span>
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-center mt-10">
          {/* <BaseLogoSm /> */}
          <motion.img
            alt="logo"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            src={BaseLogoSm.src}
          />
        </div>
        <motion.h1
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h5 className="font-bold text-lg">Welcome to Eraswap</h5>
          <p>Bop on the screen and watch your score rise</p>
        </motion.h1>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link href={`/mobile/tap`}>
            <Button
              onClick={() => dispatch(welcomePageUpdate({userId: String(user?.id)}))}
              size={`lg`}
              className="w-full mt-20"
              variant={`primary`}
            >
              Get started
            </Button>
          </Link>
        </motion.div>
      </div>
    </Container>
  );
};

export default Welcome;
