import { LogoIcon } from "@/assets/icons";
import React from "react";
import { Button } from "./ui/Button";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-3 p-4 lg:py-10">
      <LogoIcon />
      <Button variant={`primary`}>Join Base</Button>
    </div>
  );
};

export default Header;
