import { ArrowLeft, MoneyBagColoredIcon } from "@/assets/icons";
import { NoviceBadge } from "@/assets/images";
import Container from "@/components/container";
import { Button } from "@/components/ui/Button";
import Carousel from "@/components/ui/Carousel";
import { Progress } from "@/components/ui/ProgressBar";
import Image from "next/image";
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

        <Carousel responsive={{ desktop: 1, mobile: 1, tablet: 1 }}>
          <div>
            <div className="text-center py-10">
              <h1 className="text-2xl font-medium py-3">Novice League</h1>
              <p className="text-gray-light">
                Your number of shares determines the league you enter
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image src={NoviceBadge} alt="novice" />
            </div>

            <div className="text-center py-10">
              <div className="py-2">28/5 000</div>
              <Progress className="h-4" value={30} />
            </div>
          </div>
        </Carousel>
      </div>
    </Container>
  );
};

export default page;
