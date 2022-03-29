// a custom media player component

import React, { useEffect, useRef, useState } from 'react';
import { Form, useFetcher } from 'remix';

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

  const form = useFetcher();

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

  return (
    <div className="grid gap-2 max-w-md">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTime}
        onLoadedMetadata={handleDuration}
      />

      <div className="flex items-baseline gap-2">
        <p>{props.title}</p>
        <p className="text-sm">
          <span>{formatTime(currentTime)} - </span>
          <span>{formatTime(duration)}</span>
        </p>
      </div>

      <div className="flex">
        <div className="flex">
          <form.Form method="post" className="flex">
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
          </form.Form>
          <button
            onClick={handleStop}
            className="color-white hover:color-red-800 flex items-center"
          >
            <StopSVG />
          </button>
          <input
            id="seek-slider"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </div>

        <div className="flex">
          <button
            onClick={handleMute}
            className="flex items-center color-white hover:color-red-800"
          >
            {isMuted ? <Mute /> : <Sound />}
          </button>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolume}
          />
        </div>

        <Form method="post">
          <input type="hidden" name="id" value={src} />
          <button name="_action" value="download">
            Download
          </button>
        </Form>
      </div>
    </div>
  );
}

function PlaySVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"
      ></path>
    </svg>
  );
}

function PauseSVG() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
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

function Sound() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M18.5 12A4.5 4.5 0 0 0 16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L9 9H6c-.55 0-1 .45-1 1z"
      ></path>
    </svg>
  );
}

function Mute() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M7 9v6h4l5 5V4l-5 5H7z"></path>
    </svg>
  );
}

// convert seconds to minutes and seconds
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}
