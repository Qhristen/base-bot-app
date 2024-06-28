import React, { useState, useEffect } from "react";
import moment from "moment";

export const CountdownTimer = () => {
  // Get the current time using moment
  const now = moment();

  // Get the end of the day
  const endOfDay = now.clone().endOf("day");

  // Calculate the remaining time in seconds until the end of the day
  const remainingTimeInSeconds = endOfDay.diff(now, "seconds");

  const initialTime = remainingTimeInSeconds;

  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          console.log("Countdown complete!");
          setTimeRemaining(initialTime)
          return 0
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return { hours, minutes, seconds };
};
