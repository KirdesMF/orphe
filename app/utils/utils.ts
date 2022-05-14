export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const minutesLeft = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = Math.floor(time % 60);
  const secondsLeft = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutesLeft}:${secondsLeft}`;
}

// join class names function
export function clsx(...args: Array<string>) {
  return args.join(' ');
}

export async function saveFileWithFetch(url: string, title: string) {
  const filename = `${title}.mp3`;
  const res = await fetch(url);
  const blob = await res.blob();
  const a = document.createElement('a');

  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.setProperty('display', 'none');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// set days to seconds
export function daysToSeconds(days: number) {
  return days * 24 * 60 * 60;
}
