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

export async function saveFileWithFetch(url: string) {
  const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
  const res = await fetch(url);
  const blob = await res.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
