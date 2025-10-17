"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Boxes = ({ className }: { className?: string }) => {
  // Reduced from 15,000 elements (150x100) to ~3,000 elements (60x50) for better coverage while maintaining performance
  const rows = new Array(60).fill(1);
  const cols = new Array(50).fill(1);
  const colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        // Nudge toward top-left and enlarge to ensure full corner coverage
        transform: `translate(-52%,-52%) skewX(-48deg) skewY(14deg) scale(0.9) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        // Slightly larger canvas to avoid edge gaps on ultra-wide viewports
        "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] z-0",
        className
      )}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className="w-16 h-8 border-l border-slate-200 dark:border-slate-800 relative"
        >
          {cols.map((_, j) => (
            <div
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-slate-200 dark:border-slate-800 relative hover:bg-[var(--sky-300)] transition-colors duration-200"
              style={{
                // @ts-ignore - CSS variable for hover color
                "--hover-color": `var(${getRandomColor()})`,
              }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-200 dark:text-slate-800 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
