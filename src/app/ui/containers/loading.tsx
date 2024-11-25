"use client";

import { useEffect, useState } from "react";
import { Progress } from "@ui/elements";


const waitingTime = 200;
const initValue = 13;

export function Loading() {
  const [progress, setProgress] = useState(initValue);
  const handleTimeout = () => {
    const progressing = 90;
    setProgress(progressing);
  };
  useEffect(() => {
    const timer = setTimeout(handleTimeout, waitingTime);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Progress value={progress} className="w-2/3 m-auto my-52" />
  );
}