import React, { useEffect, useRef, useState } from "react";
import Logo1 from "@/assets/random-logo/0555f13a4a01dc6d68160e05f71bd88d.png";
import Logo2 from "@/assets/random-logo/05c80cce9d570df2544097db452da5ce.png";
import Logo3 from "@/assets/random-logo/2600375f9d508c835374e79e99ab6053.png";
import Logo4 from "@/assets/random-logo/273ab5e91af52af15771907a1c33823f.png";
import Logo5 from "@/assets/random-logo/310135a690aa7c453a309277c31bb507.png";
import Logo6 from "@/assets/random-logo/3a2d274d9f2e67084d08b4381061ab16.png";
import Logo7 from "@/assets/random-logo/4f79f7a0a358adc0bdbe1b2766ac1800.png";
import Logo8 from "@/assets/random-logo/56deba893608bc938d689e9a7fada455.png";
import Logo9 from "@/assets/random-logo/5d3127bf77e3f740ed8774b7b0fe43ea.png";
import Logo10 from "@/assets/random-logo/644475df27c57eb861249de8fdd053e6.png";
import Logo11 from "@/assets/random-logo/6c001dd6cfdbcc1567d560b6ebe8913b.png";
import Logo12 from "@/assets/random-logo/6d1b4c05897aecd789732a8d9b09ba6f.png";
import { StaticImageData } from "next/image";

const logos: StaticImageData[] = [
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
  Logo10,
  Logo11,
  Logo12,
];


interface LogoElement {
  id: number;
  src: string;
  style: React.CSSProperties;
}

interface IPosition {
  id?: number;
  identifier?: number;
  clientX: number;
  clientY: number;
}

function getRandomPosition(): { x: number; y: number } {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return { x, y };
  }

const TapGuruAnimation = () => {
  const [logoElements, setLogoElements] = useState<LogoElement[]>([]);
  const idCounter = useRef(0);
  const requestRef = useRef<number>();

  const popRandomLogo = () => {
    const randomLogo = logos[Math.floor(Math.random() * logos.length)];
    const {x, y}=getRandomPosition()
    const logoElement: LogoElement = {
      id: idCounter.current++,
      src: randomLogo.src,
      style: { left: `${x}px`, top: `${y}px` },
    };

    setLogoElements((prevElements) => [...prevElements, logoElement]);

    setTimeout(() => {
      setLogoElements((prevElements) =>
        prevElements.filter((element) => element.id !== logoElement.id)
      );
    }, 1000);
  };

  const animate = () => {
    popRandomLogo();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);


  return (
    <div>
      {logoElements.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          className="absolute z-30 pop"
          style={logo.style}
          alt="Random Logo"
        />
      ))}
    </div>
  );
};

export default TapGuruAnimation;
