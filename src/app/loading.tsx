"use client";

import { Progress } from "@/shadcn/elements/progress";
import React from "react";

export default function Loading() {
  const initValue = 13;
  const [progress, setProgress] = React.useState(initValue);
  const waitingTime = 200;
  const handleTimeout = () => {
    const progressing = 90;
    setProgress(progressing);
  };
  React.useEffect(() => {
    const timer = setTimeout(handleTimeout, waitingTime);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Progress value={progress} className="w-2/3 m-auto my-52" />
  );
}