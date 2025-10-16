"use client";

import React from "react";
import { Boxes } from "@/components/ui/shadcn-io/background-boxes";
import { cn } from "@/lib/utils";

export const Background = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "absolute inset-0 w-full h-full bg-background overflow-hidden rounded-[42px] md:rounded-[72px]",
      className
    )}>
      <div className="absolute inset-0 w-full h-full bg-gradient-radial from-transparent via-background/30 to-background/60 z-20 pointer-events-none" />
      <Boxes />
    </div>
  );
};
