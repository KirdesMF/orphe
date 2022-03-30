// a custom media player component

import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'remix';

type Props = {
  id: number;
  src: string;
  title: string;
  currentSong: number;
  setCurrentSong: React.Dispatch<React.SetStateAction<number>>;
};

export function CustomPlayer(props: Props) {
  const { id, src, currentSong, setCurrentSong } = props;
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState('50');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current!.volume = Number(volume) / 100;
  });

  useEffect(() => {
    if (currentSong === id) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [id, currentSong]);

  const togglePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.id);
    setCurrentSong(id);

    if (id === currentSong) {
      isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0;
    setIsPlaying(false);
  };

  const handleTime = () => {
    const { currentTime } = audioRef.current!;
    setCurrentTime(currentTime);
  };

  const handleDuration = () => {
    const { duration } = audioRef.current!;
    setDuration(duration);
  };

  const handleMute = () => {
    audioRef.current!.muted = !audioRef.current!.muted;
    setIsMuted(audioRef.current!.muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVolume(value);
    audioRef.current!.volume = Number(value) / 100;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    audioRef.current!.currentTime = Number(value);
  };

  const handleDownload = () => saveFileWithFetch(src);

  return (
    <article className="grid gap-2">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTime}
        onLoadedMetadata={handleDuration}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <p>{props.title}</p>
          <p className="text-sm">
            <span>{formatTime(currentTime)} - </span>
            <span>{formatTime(duration)}</span>
          </p>
        </div>

        <div className="flex">
          <button
            onClick={handleMute}
            className="flex items-center color-white hover:color-red-800"
          >
            {isMuted ? <MuteSVG /> : <SoundSVG />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolume}
            className="w-[4rem]"
          />
        </div>
      </div>

      <div className="flex">
        <Form method="post" className="flex">
          <input type="hidden" name="id" value={id} />
          <button
            name="_action"
            value="increment"
            id={id.toString()}
            onClick={togglePlay}
            className="color-white hover:color-red-800 flex items-center"
          >
            {isPlaying ? <PauseSVG /> : <PlaySVG />}
          </button>
        </Form>

        <button
          onClick={handleStop}
          className="color-white hover:color-red-800 flex items-center"
        >
          <StopSVG />
        </button>

        <Form method="post" className="flex">
          <input type="hidden" name="id" value={id} />
          <button
            onClick={handleDownload}
            name="_action"
            value="download"
            className="flex items-center color-white hover:color-red-800"
          >
            <DownloadSVG />
          </button>
        </Form>

        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1"
        />
      </div>
    </article>
  );
}

function PlaySVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z"
      ></path>
    </svg>
  );
}

function PauseSVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10 4H5v16h5V4zm9 0h-5v16h5V4z"></path>
    </svg>
  );
}

function StopSVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M6 6h12v12H6z"></path>
    </svg>
  );
}

function SoundSVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M11 2h2v20h-2v-2H9v-2h2V6H9V4h2V2zM7 8V6h2v2H7zm0 8H3V8h4v2H5v4h2v2zm0 0v2h2v-2H7zm10-6h-2v4h2v-4zm2-2h2v8h-2V8zm0 8v2h-4v-2h4zm0-10v2h-4V6h4z"
      ></path>
    </svg>
  );
}

function MuteSVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M13 2h-2v2H9v2H7v2H3v8h4v2h2v2h2v2h2V2zM9 18v-2H7v-2H5v-4h2V8h2V6h2v12H9zm10-6.777h-2v-2h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2v-2zm0 0h2v-2h-2v2z"
      ></path>
    </svg>
  );
}

function DownloadSVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M11 4h2v8h2v2h-2v2h-2v-2H9v-2h2V4zm-2 8H7v-2h2v2zm6 0v-2h2v2h-2zM4 18h16v2H4v-2z"
      ></path>
    </svg>
  );
}

// convert seconds to minutes and seconds
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

// save file from url
async function saveFileWithFetch(url: string) {
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
