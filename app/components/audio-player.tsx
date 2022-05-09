import { useRef, useState } from 'react';
import * as Icon from './icons';
import type { Song } from '~/models/song';
import { clsx, formatTime } from '~/utils/utils';

type Props = {
  songs: Array<Song>;
};

export function AudioPlayer(props: Props) {
  // references
  const audioRef = useRef<HTMLAudioElement>(null); // audio element
  const sliderRef = useRef<HTMLInputElement>(null); // slider element

  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // effects
  function handleLoaded() {
    setDuration(audioRef.current?.duration || 0);
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

  function handleProgress() {
    audioRef.current!.currentTime = Number(sliderRef.current?.value);
  }

  function handleTime() {
    sliderRef.current!.value = `${audioRef.current?.currentTime}`;
    setCurrentTime(audioRef.current?.currentTime || 0);
  }

  function handlePlayListItem(idx: number) {
    setCurrentTrack(idx);
    setIsPlaying(true);
  }

  return (
    <article className="grid gap-y-5 min-w-2xl ma">
      <div className="grid place-items-center gap-y-5">
        <audio
          ref={audioRef}
          src={props.songs[currentTrack].source}
          onTimeUpdate={handleTime}
          onLoadedMetadata={handleLoaded}
          onEnded={handleNextTrack}
        ></audio>

        <h3>{props.songs[currentTrack].title}</h3>

        <div className="flex items-center gap-5">
          <button className="w-15 h-15 color-red" onClick={handlePrevTrack}>
            <Icon.PrevSVG />
            <span className="sr-only">Previous song</span>
          </button>
          <button className="w-25 h-25 color-red" onClick={handlePlay}>
            {isPlaying ? <Icon.PauseSVG /> : <Icon.PlaySVG />}
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button className="w-15 h-15 color-red" onClick={handleNextTrack}>
            <Icon.NextSVG />
            <span className="sr-only">Next song</span>
          </button>
        </div>

        <div className="flex gap-5">
          <span className="tabular-nums">{formatTime(currentTime)}</span>
          <label className="grid place-items-center">
            <span className="sr-only">Slider range seek track</span>
            <input
              ref={sliderRef}
              onChange={handleProgress}
              type="range"
              name="seek"
              id="seek"
              defaultValue={0}
              max={duration}
            />
          </label>
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      <ul>
        {props.songs.map((song, index) => (
          <li
            key={song.id}
            className={clsx(
              currentTrack === index ? 'bg-amber color-black' : '',
              'flex items-center justify-between px-2'
            )}
          >
            <span>{song.title}</span>
            <div className="flex items-center">
              <button
                className="w-8 h-8 color-red"
                onClick={() => handlePlayListItem(index)}
              >
                <Icon.PlaySVG />
                <span className="sr-only">Play track {song.title}</span>
              </button>
              <button className="w-8 h-8 color-red">
                <Icon.LikeSVG />
              </button>
              <button className="w-8 h-8 color-red">
                <Icon.DownloadSVG />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
