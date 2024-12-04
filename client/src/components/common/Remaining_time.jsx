import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function RemainingTime({ bidEndTime, createdAt }) {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      const endTime = new Date(bidEndTime);
      const currentTime = new Date();
      const diffMs = endTime - currentTime;

      const days = Math.floor(diffMs / 86400000);
      const hours = Math.floor((diffMs % 86400000) / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);

      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [bidEndTime, createdAt]);

  return <div>{remainingTime}</div>;
}
