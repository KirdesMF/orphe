import { useEffect, useState } from 'react';

type Props = {
  targetDate: string;
};

export function CountDown(props: Props) {
  const targetDate = new Date(props.targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const values = getCountDownValues(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <p className="text-4xl">
      <span>{values.days} jours, </span>
      <span>{values.hours} heures, </span>
      <span>{values.minutes} minutes, </span>
      <span>{values.seconds} seconds</span>
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
