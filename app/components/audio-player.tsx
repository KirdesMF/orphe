import { useEffect, useRef, useState } from 'react';
import { clsx, formatTime, saveFileWithFetch } from '~/utils/utils';
import * as Icon from './icons';
import type { Song } from '~/models/song';
import { AnimatePresence, motion } from 'framer-motion';
import { useFetcher } from '@remix-run/react';

type Props = {
  songs: Array<Song>;
  user_likes: Array<string>;
};

export function AudioPlayer(props: Props) {
  // references
  const audioRef = useRef<HTMLAudioElement>(null); // audio element
  const containerRef = useRef<HTMLUListElement>(null); // -container list element
  const didMountRef = useRef(false); // did mount flag

  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const fetcher = useFetcher();

  // effects
  // fire when song data is loaded
  function handleLoaded() {
    setDuration(audioRef.current?.duration ?? 0);
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }

  // handle onChange event of slider
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    audioRef.current!.currentTime = evt.target.valueAsNumber;
  }

  // handle onTimeUpdate event of audio element
  function handleTimeUpdate() {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  }

  function setProgressCSSVar() {
    const value = (currentTime / duration) * 100;
    const progress = !isNaN(value) ? value : 0;

    return progress;
  }

  function handleNextTrack() {
    if (currentTrack === props.songs.length - 1) {
      return setCurrentTrack(0);
    }
    setCurrentTrack((curr) => curr + 1);
  }

  function handlePrevTrack() {
    if (currentTrack === 0) {
      return setCurrentTrack(props.songs.length - 1);
    }
    setCurrentTrack((curr) => curr - 1);
  }

  function handlePlay() {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    setIsPlaying((prev) => !prev);
  }

  function handlePlayListItem(idx: number) {
    setCurrentTrack(idx);
    setIsPlaying(true);
  }

  function handleDownload(id: number, src: string) {
    fetcher.submit(
      {
        id: `${id}`,
        _action: 'increment_download',
      },
      { method: 'post' }
    );
    saveFileWithFetch(src);
  }

  function handleLike(id: number) {
    fetcher.submit(
      {
        id: `${id}`,
        like: isUserLiked(id) ? '-1' : '1',
        _action: 'update_likes',
      },
      { method: 'post' }
    );
  }

  function isUserLiked(id: number) {
    return props.user_likes.includes(`${id}`);
  }

  // use to avoid scrolling behavior on first render
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
          onTimeUpdate={handleTimeUpdate}
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
            <AnimatePresence exitBeforeEnter>
              {isPlaying ? (
                <motion.span
                  key="pause"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Icon.PauseSVG />
                </motion.span>
              ) : (
                <motion.span
                  key="play"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Icon.PlaySVG />
                </motion.span>
              )}
            </AnimatePresence>
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
              className="range"
              type="range"
              name="seek"
              id="seek"
              step={0.1}
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleChange}
              style={
                {
                  '--progress': `${setProgressCSSVar()}%`,
                } as React.CSSProperties
              }
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
              'flex items-center justify-between px-2 py-1 transition-colors-200 hover:bg-white/15'
            )}
          >
            <span>{song.title}</span>
            <div className="flex items-center">
              <button
                className="w-8 h-8 hover:color-emerald"
                onClick={() => {
                  handlePlayListItem(index);
                }}
              >
                <Icon.PlaySVG />
                <span className="sr-only">Play track {song.title}</span>
              </button>

              <button
                className={clsx(
                  'w-8 h-8 hover:color-red-800',
                  isUserLiked(song.id) ? 'color-red' : ''
                )}
                onClick={() => handleLike(song.id)}
              >
                <Icon.LikeSVG />
                <span className="sr-only">Like track {song.title}</span>
              </button>

              <button
                onClick={() => handleDownload(song.id, song.source)}
                className="w-8 h-8 hover:color-red"
              >
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
