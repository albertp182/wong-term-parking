"use client";

import { useEffect, useState } from "react";
import { WEDDING_DATE } from "@/data/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const difference = new Date(WEDDING_DATE + "T16:00:00").getTime() - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return <div className="h-20" />;
  }

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold tracking-tight text-white tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/70">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl font-light text-white/40">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
