import { useEffect, useRef, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx, formatTime, saveFileWithFetch } from '~/utils/utils';
import * as Icon from './icons';
import type { Song } from '~/models/song';

type Props = {
  songs: Array<Song>;
  user_likes: Array<string>;
};

export function AudioPlayer(props: Props) {
  // references
  const audioRef = useRef<HTMLAudioElement>(null!); // audio element
  const containerRef = useRef<HTMLUListElement>(null); // -container list element
  const didMountRef = useRef(false); // did mount flag
  const hasListened = useRef(false); // has listened flag

  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { submit, submission } = useFetcher();

  // set css variable for gradient input
  const setProgressCSSVar = (currentTime / duration) * 100;

  // fire when song data is loaded
  function handleLoaded() {
    hasListened.current = false;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
    setCurrentTime(0);

    if (isNaN(audioRef.current.duration)) setDuration(0);
    else setDuration(audioRef.current.duration);
  }

  // handle onChange event of slider
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    audioRef.current!.currentTime = evt.target.valueAsNumber;
  }

  // handle onTimeUpdate event of audio element
  function handleTimeUpdate() {
    setCurrentTime(audioRef.current?.currentTime ?? 0);

    if (currentTime >= 30 && !hasListened.current) {
      hasListened.current = true;
      submit(
        {
          id: `${props.songs[currentTrack].id}`,
          _action: 'increment_listening',
        },
        { method: 'post' }
      );
    }
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
    submit(
      {
        id: `${id}`,
        _action: 'increment_download',
      },
      { method: 'post' }
    );
    saveFileWithFetch(src);
  }

  function handleLike(id: number) {
    submit(
      {
        id: `${id}`,
        like: isUserLiked(id) ? '-1' : '1',
        _action: 'update_likes',
      },
      { method: 'post' }
    );
  }

  const isUserLiked = (id: number) => props.user_likes.includes(`${id}`);
  const isTrackItemPlaying = (idx: number) => idx === currentTrack && isPlaying;

  function isSubmitting(
    id: number,
    action: 'update_likes' | 'increment_download'
  ) {
    return (
      submission &&
      submission.formData.get('_action') === action &&
      submission.formData.get('id') === `${id}`
    );
  }

  // effects
  useEffect(() => {
    // use to avoid scrolling behavior on first render
    if (didMountRef.current) {
      containerRef.current?.children[currentTrack].scrollIntoView({
        behavior: 'smooth',
      });
    } else didMountRef.current = true;
  }, [currentTrack]);

  // set duration with use effect because onload event is not fired on render
  useEffect(() => {
    if (isNaN(audioRef.current.duration)) setDuration(0);
    else setDuration(audioRef.current.duration);
  }, []);

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
          <motion.button
            className="w-20 h-20 color-red rounded"
            onClick={handlePrevTrack}
            whileTap={{ scale: 0.8 }}
          >
            <Icon.PrevSVG />
            <span className="sr-only">Previous song</span>
          </motion.button>

          <button className="w-25 h-25 color-red" onClick={handlePlay}>
            <AnimatePresence exitBeforeEnter initial={false}>
              {isPlaying ? (
                <motion.span
                  key="pause"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Icon.PauseSVG />
                </motion.span>
              ) : (
                <motion.span
                  key="play"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <Icon.PlaySVG />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <motion.button
            whileTap={{ scale: 0.8 }}
            className="w-20 h-20 color-red"
            onClick={handleNextTrack}
          >
            <Icon.NextSVG />
            <span className="sr-only">Next song</span>
          </motion.button>
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
              max={duration ?? 0}
              value={currentTime}
              onChange={handleChange}
              style={
                {
                  '--progress': `${setProgressCSSVar}%`,
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
              'flex items-center justify-between px-2 py-1 transition-colors-200 hover:bg-white/15 hover:color-white'
            )}
          >
            <span>{song.title}</span>
            <div className="grid grid-flow-col gap-x-1">
              <button
                className="w-7 h-7 hover:color-emerald"
                onClick={() => {
                  handlePlayListItem(index);
                }}
              >
                {isTrackItemPlaying(index) ? (
                  <Icon.PauseSVG />
                ) : (
                  <Icon.PlaySVG />
                )}
                <span className="sr-only">Play track {song.title}</span>
              </button>

              <button
                disabled={isSubmitting(song.id, 'update_likes')}
                name="_action"
                value="update_likes"
                className={clsx(
                  'w-7 h-7 hover:color-red-800',
                  isUserLiked(song.id) ? 'color-red' : ''
                )}
                onClick={() => handleLike(song.id)}
              >
                {isSubmitting(song.id, 'update_likes') ? (
                  <motion.span
                    animate={{
                      scale: [0.5, 1],
                      transition: { duration: 0.2, repeat: Infinity },
                    }}
                    className="h-5 w-5 rounded-full block border-yellow border-1"
                  />
                ) : (
                  <Icon.LikeSVG />
                )}
                <span className="sr-only">Like track {song.title}</span>
              </button>

              <button
                disabled={isSubmitting(song.id, 'increment_download')}
                name="_action"
                value="increment_download"
                onClick={() => handleDownload(song.id, song.source)}
                className="w-7 h-7 hover:color-red"
              >
                {isSubmitting(song.id, 'increment_download') ? (
                  <motion.span
                    animate={{
                      scale: [0.5, 1],
                      transition: { duration: 0.2, repeat: Infinity },
                    }}
                    className="h-5 w-5 rounded-full block border-yellow border-1"
                  />
                ) : (
                  <Icon.DownloadSVG />
                )}
                <span className="sr-only">Download track {song.title}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
