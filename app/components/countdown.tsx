import { useEffect, useState } from 'react';

type Props = {
  targetDate: number;
  timeLeft: number;
};

export function CountDown(props: Props) {
  const [timeLeft, setTimeLeft] = useState(props.timeLeft);
  const values = getCountDownValues(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(props.targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [props.targetDate]);

  return (
    <p className="text-clamp-4xl font-900 tabular-nums">
      <span>{values.days} j. </span>
      <span>{values.hours} h. </span>
      <span>{values.minutes} m. </span>
      <span className="color-red-900">{values.seconds} s.</span>
    </p>
  );
}

function getCountDownValues(countdown: number) {
  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
