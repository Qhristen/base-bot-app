"use client";

import Link from 'next/link';
import React from 'react';
import { Button } from './ui/Button';

const DesktopMessage = () => {
    return (
        <div className="flex w-full h-screen text-white flex-col items-center justify-center">
          <h1 className="text-4xl font-black text-center">
            Leave the Desktop, <br />
             Mobile gaming rocks!.
          </h1>
          <Link href={`https://t.me/Taponbase_bot`}>
            <Button size={`lg`} className="w-full mt-5" variant={`primary`}>
              @Taponbase_bot
            </Button>
          </Link>
        </div>
    );
};

export default DesktopMessage;