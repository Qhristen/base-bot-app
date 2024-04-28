import { ArrowLeft, MoneyBagColoredIcon } from "@/assets/icons";
import Container from "@/components/container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Container>
      <div className="text-white p-5">
        <div className="flex items-center justify-start py-4">
          <Link href={`/mobile/task`}>
            <ArrowLeft />
          </Link>
        </div>
        <h1 className="text-2xl font-medium py-3">Join our socials</h1>
        <p className="text-gray-light">
          We regularly share valuable content on our socials Join us there and
          get the rewards
        </p>
        <div className="bg-gray rounded-2xl p-4 mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                <MoneyBagColoredIcon className="scale-75" />
              </div>
              <div className="text-white">
                <h4 className="font-normal text-white">Reward</h4>
                <div className="flex items-center gap-2 font-normal text-white">
                  <span className="text-sm">200,000 </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray rounded-2xl p-4 mt-5">
          {Array.from({ length: 3 }).map((data, i) => (
            <div key={i} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    <h4 className="font-medium text-white">
                      Join the Telegram Chat
                    </h4>
                  </div>
                </div>
                <Button size={`sm`} variant={`primary`}>
                  Go
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button size={`lg`} variant={`primary`} className="w-full mt-10">
          Submit task
        </Button>
      </div>
    </Container>
  );
};

export default page;
