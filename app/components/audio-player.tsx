import { useEffect, useRef, useState } from 'react';
import { clsx, formatTime } from '~/utils/utils';
import * as Icon from './icons';
import type { Song } from '~/models/song';

type Props = {
  songs: Array<Song>;
};

export function AudioPlayer(props: Props) {
  // references
  const audioRef = useRef<HTMLAudioElement>(null); // audio element
  const sliderRef = useRef<HTMLInputElement>(null); // slider element
  const containerRef = useRef<HTMLUListElement>(null); // -container list element
  const didMountRef = useRef(false); // did mount flag

  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // effects
  function handleLoaded() {
    setDuration(audioRef.current?.duration || 0);
    sliderRef.current?.style.setProperty('--progress', `${0}%`);
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }

  function handleNextTrack() {
    currentTrack === props.songs.length - 1
      ? setCurrentTrack(0)
      : setCurrentTrack((curr) => curr + 1);
  }

  function handlePrevTrack() {
    currentTrack === 0
      ? setCurrentTrack(props.songs.length - 1)
      : setCurrentTrack((curr) => curr - 1);
  }

  function handlePlay() {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    setIsPlaying((prev) => !prev);
  }

  function handleChange() {
    audioRef.current!.currentTime = sliderRef.current?.valueAsNumber || 0;
    setProgressVar();
  }

  function handleTime() {
    const currentTime = audioRef.current?.currentTime || 0;

    sliderRef.current!.value = `${Math.floor(currentTime)}`;
    setProgressVar();
    setCurrentTime(currentTime);
  }

  function setProgressVar() {
    const { min, max, valueAsNumber } = sliderRef.current!;
    const progress =
      Math.floor(
        ((valueAsNumber - Number(min)) / (Number(max) - Number(min))) * 100
      ) || 0;

    sliderRef.current?.style.setProperty('--progress', `${progress}%`);
  }

  function handlePlayListItem(idx: number) {
    setCurrentTrack(idx);
    setIsPlaying(true);
  }

  useEffect(() => {
    if (didMountRef.current) {
      containerRef.current?.children[currentTrack].scrollIntoView({
        behavior: 'smooth',
      });
    } else didMountRef.current = true;
  }, [currentTrack]);

  return (
    <div className="w-[min(100%,35rem)] grid gap-y-12">
      <article className="grid justify-items-center gap-y-3">
        <audio
          ref={audioRef}
          src={props.songs[currentTrack].source}
          onTimeUpdate={handleTime}
          onLoadedMetadata={handleLoaded}
          onEnded={handleNextTrack}
        ></audio>

        <h3 className="text-clamp-xl">{props.songs[currentTrack].title}</h3>

        <div className="flex items-center justify-center gap-5">
          <button
            className="w-20 h-20 color-red rounded"
            onClick={handlePrevTrack}
          >
            <Icon.PrevSVG />
            <span className="sr-only">Previous song</span>
          </button>
          <button className="w-25 h-25 color-red" onClick={handlePlay}>
            {isPlaying ? <Icon.PauseSVG /> : <Icon.PlaySVG />}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button className="w-20 h-20 color-red" onClick={handleNextTrack}>
            <Icon.NextSVG />
            <span className="sr-only">Next song</span>
          </button>
        </div>

        <div className="flex gap-5 w-full">
          <span className="tabular-nums">{formatTime(currentTime)}</span>
          <label className="grid w-full">
            <span className="sr-only">Slider range seek track</span>
            <input
              ref={sliderRef}
              onChange={handleChange}
              type="range"
              name="seek"
              id="seek"
              step={0.1}
              defaultValue={0}
              min={0}
              max={Math.floor(duration)}
              className="range"
            />
          </label>

          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </article>

      <ul
        ref={containerRef}
        className="relative overflow-y-scroll max-h-60 snap-y"
      >
        {props.songs.map((song, index) => (
          <li
            key={song.id}
            className={clsx(
              currentTrack === index ? 'bg-green color-black' : 'color-white',
              'flex items-center justify-between px-2 py-1 transition-colors-200 hover:bg-green-600 hover:color-black'
            )}
          >
            <span>{song.title}</span>
            <div className="flex items-center">
              <button
                className="w-8 h-8 "
                onClick={() => {
                  handlePlayListItem(index);
                }}
              >
                <Icon.PlaySVG />
                <span className="sr-only">Play track {song.title}</span>
              </button>
              <button className="w-8 h-8">
                <Icon.LikeSVG />
                <span className="sr-only">Like track {song.title}</span>
              </button>
              <button className="w-8 h-8">
                <Icon.DownloadSVG />
                <span className="sr-only">Download track {song.title}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
