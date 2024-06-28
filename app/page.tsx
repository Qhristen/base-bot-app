import { BaseLogoSm } from "@/assets/icons";
import { BaseLogoLg, NoviceBadge } from "@/assets/images";
import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Header />
      <div className="flex items-center justify-between gap-2  text-white p-4 flex-col-reverse lg:flex-row">
        <div className="">
          <h1 className="font-bold text-4xl">
            Tap into the Future of Crypto Earnings
          </h1>
          <p className="py-6 text-gray-light">
            Tap on the coin and see your balance rise – experience the thrill of
            earning crypto effortlessly with Base.
          </p>
          <Link href={`https://t.me/taponbase`}>
            <Button variant={`primary`}>Join Base</Button>
          </Link>
        </div>
        <div className="scale-50 hideen lg:block lg:scale-100">
          {/* <BaseLogoLg className="" /> */}
          <Image src={BaseLogoSm} width={500} height={300} alt="BaseLogoLg" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-20 p-4">
        <div className="flex items-center flex-col p-5 text-white bg-gray rounded-2xl lg:flex-row">
          <Image
            src={`/badges/MasterBadge.png`}
            width={300}
            height={150}
            alt="NoviceBadge"
          />
          <div>
            <h2 className="font-bold text-3xl">
              Grow as you <br /> share{" "}
            </h2>
            <p className="text-gray-light text-wrap">
              Level up your earnings, share Base and watch yourself grow from
              novice to{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-6 text-white bg-gray rounded-2xl">
          <div>
            <h2 className="font-bold text-3xl">
              Earn exclusive <br /> rewards{" "}
            </h2>
            <p className="text-gray-light text-wrap">
              Unlock exclusive rewards, participate in tasks and elevate your
              earnings with base.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 m-4 text-center text-white bg-gray my-20 py-20 rounded-2xl">
        <h1 className="font-bold text-3xl py-4">
          Join our telegram community to <br /> explore more
        </h1>
        <Link href={`https://t.me/taponbase`}>
          <Button variant={`primary`}>Join telegram channel</Button>
        </Link>
      </div>
      <Footer />
    </Container>
  );
}
