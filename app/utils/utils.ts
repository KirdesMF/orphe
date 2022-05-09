export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const minutesLeft = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = Math.floor(time % 60);
  const secondsLeft = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutesLeft}:${secondsLeft}`;
}

// join class names function
export function clsx(...args: string[]) {
  return args.join(' ');
}
