import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function RemainingTime({ bidEndTime, createdAt }) {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateRemainingTime = () => {
      const endTime = new Date(bidEndTime);
      const currentTime = new Date();
      const diffMs = endTime - currentTime;

      const days = Math.floor(diffMs / 86400000);
      const hours = Math.floor((diffMs % 86400000) / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);

      setRemainingTime({ days, hours, minutes, seconds });
    };

    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [bidEndTime, createdAt]);

  return (
    <div className="flex gap-4 my-5">
      <div className=" border-4 border-primary rounded-md p-3 px-5">
        <p className="text-center text-3xl">{remainingTime.days}</p>
        <p className="text-center text-sm">Days</p>
      </div>
      <div className=" border-4 border-primary rounded-md p-2 px-5">
        <p className="text-center text-3xl">{remainingTime.hours}</p>
        <p className="text-center text-sm">Hours</p>
      </div>
      <div className=" border-4 border-primary rounded-md p-2 px-4">
        <p className="text-center text-3xl">{remainingTime.minutes}</p>
        <p className="text-center text-sm">Minutes</p>
      </div>
      <div className=" border-4 border-primary rounded-md p-2 px-4">
        <p className="text-center text-3xl">{remainingTime.seconds}</p>
        <p className="text-center text-sm">Seconds</p>
      </div>
    </div>
  );
}
