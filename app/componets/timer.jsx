"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  // Data final do lançamento (7 dias a partir de quando definiste)
  const endTime = new Date("2025-12-11T00:00:00Z").getTime();

  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft <= 0) {
    return <div>O jogo já foi lançado!</div>;
  }

  const hours = Math.floor(timeLeft / 1000 / 60 / 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
      {hours}h : {minutes.toString().padStart(2, "0")}m : {seconds
        .toString()
        .padStart(2, "0")}s
    </div>
  );
}
