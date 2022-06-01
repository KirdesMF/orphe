import { useEffect, useRef, useState } from 'react';
import { useFetcher } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx, formatTime, saveFileWithFetch } from '~/utils/utils';
import * as Icon from './icons';
import type { Song } from '~/models/song';

type AudioPlayerProps = {
  songs: Array<Song>;
  user_likes: Array<string>;
};

// TODO
// create component for progress/slider bar
// create component for volume/volume slider

export function AudioPlayer(props: AudioPlayerProps) {
  // references
  const audioRef = useRef<HTMLAudioElement>(null); // audio element
  const hasListened = useRef(false); // has listened flag

  // states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { submit } = useFetcher();

  // set css variable for gradient input
  const setProgressCSSVar = () => {
    const time = (currentTime / duration) * 100;
    return !isFinite(time) ? 0 : time;
  };

  // fire when song data is loaded
  // * does not fire consistently
  function handleLoaded() {
    hasListened.current = false;
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    setCurrentTime(0);
    setDuration(
      !isNaN(audioRef.current!.duration) ? audioRef.current!.duration : 0
    );
  }

  // because of ssr we need to wait for the audio element to be render
  // to set the duration of the track
  useEffect(() => {
    setDuration(
      !isNaN(audioRef.current!.duration) ? audioRef.current!.duration : 0
    );
  }, []);

  // handle onChange event of slider
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    audioRef.current!.currentTime = evt.target.valueAsNumber;
  }

  // handle onTimeUpdate event of audio element
  // * maybe use setInterval here to update currentTime
  function handleTimeUpdate() {
    const time = Math.round(audioRef.current!.currentTime);
    setCurrentTime(time);

    if (time >= 30 && !hasListened.current) {
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

  return (
    <div className="w-[min(100%,35rem)] grid gap-y-12">
      <article className="grid justify-items-center gap-y-3">
        <audio
          ref={audioRef}
          src={props.songs[currentTrack].source}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoaded}
          onEnded={handleNextTrack}
          preload="metadata"
        >
          <p>Your browser does not support the audio element.</p>
        </audio>

        <div className="relative">
          <h2 className="text-3xl font-200">
            {props.songs[currentTrack].title}
          </h2>
          {props.songs[currentTrack].video && (
            <a
              className="absolute h-5 w-5 top-0 -right-1/2 text-[var(--red)]"
              href={props.songs[currentTrack].video}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon.YouTubeSVG />
              <span className="sr-only">
                Clip disponible pour le titre en cours
              </span>
            </a>
          )}
        </div>

        <div className="flex items-center justify-center gap-5">
          <motion.button
            className="w-20 h-20 color-[var(--red)] rounded"
            onClick={handlePrevTrack}
            whileTap={{ scale: 0.8 }}
          >
            <Icon.PrevSVG />
            <span className="sr-only">Previous song</span>
          </motion.button>

          <button className="color-[var(--red)]" onClick={handlePlay}>
            <AnimatePresence exitBeforeEnter initial={false}>
              {isPlaying ? (
                <motion.span
                  key="pause"
                  className="w-25 h-25 block"
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
                  className="w-25 h-25 block"
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
            className="w-20 h-20 color-[var(--red)]"
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
              step={1}
              min={0}
              max={duration ?? 0}
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

      <TrackList
        songs={props.songs}
        user_likes={props.user_likes}
        isPlaying
        setIsPlaying={setIsPlaying}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />

      {props.songs[currentTrack].video && (
        <a
          className="text-[var(--red)] flex items-center gap-4"
          href={props.songs[currentTrack]?.video}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon.YouTubeSVG className="h-4 w-4" />
          <span className="text-white">Clip disponible **</span>
          <Icon.ExternalLinkSVG className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

type TrackListProps = {
  songs: Array<Song>;
  user_likes: Array<string>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTrack: number;
  setCurrentTrack: (currentTrack: number) => void;
};

function TrackList({
  songs,
  user_likes,
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack,
}: TrackListProps) {
  // references
  const containerRef = useRef<HTMLUListElement>(null!); // -container list element
  const didMountRef = useRef(false); // did mount flag

  const { submit, submission } = useFetcher();

  const isUserLiked = (id: number) => user_likes.includes(`${id}`);
  const isTrackItemPlaying = (idx: number) => idx === currentTrack && isPlaying;

  function isSubmitting(
    id: number,
    action: 'update_likes' | 'increment_download'
  ) {
    return (
      submission?.formData.get('_action') === action &&
      submission?.formData.get('id') === `${id}`
    );
  }

  function handlePlayListItem(idx: number) {
    setCurrentTrack(idx);
    setIsPlaying(true);
  }

  function handleDownload(id: number, src: string, title: string) {
    submit(
      {
        _action: 'increment_download',
        id: `${id}`,
        src,
        title,
      },
      { method: 'post' }
    );
    saveFileWithFetch(src, title);
  }

  function handleLike(id: number) {
    submit(
      {
        _action: 'update_likes',
        id: `${id}`,
        like: isUserLiked(id) ? '-1' : '1',
      },
      { method: 'post' }
    );
  }

  // effects
  useEffect(() => {
    // use to avoid scrolling behavior on first render
    if (didMountRef.current) {
      containerRef.current.children[currentTrack].scrollIntoView({
        behavior: 'smooth',
      });
    } else didMountRef.current = true;
  }, [currentTrack]);

  return (
    <ul
      ref={containerRef}
      className="relative overflow-y-scroll max-h-60 snap-y border-2 border-white p-2"
    >
      {songs.map((song, index) => (
        <li
          key={song.id}
          className={clsx(
            currentTrack === index ? 'bg-white color-black' : 'color-white',
            'flex items-center justify-between px-2 py-1 transition-colors-200 hover:bg-white/15 hover:color-white'
          )}
        >
          <div className="flex gap-x-2 items-center">
            <span>{song.title}</span>
            {song.video && (
              <a
                className="h-5 w-5 top-0 -right-1/2 text-[var(--red)]"
                href={song.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon.YouTubeSVG />
                <span className="sr-only">Clip disponible ce titre</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-x-2">
            <button
              className="relative h-4 w-4"
              onClick={() => {
                handlePlayListItem(index);
              }}
            >
              {isTrackItemPlaying(index) ? (
                <Icon.PauseSVG className="absolute inset-0" />
              ) : (
                <Icon.PlaySVG className="absolute inset-0" />
              )}
              <span className="sr-only">Play track {song.title}</span>
            </button>

            <button
              disabled={isSubmitting(song.id, 'update_likes')}
              name="_action"
              value="update_likes"
              className={clsx(
                'relative h-4 w-4',
                isUserLiked(song.id) ? 'color-[var(--red)]' : 'color-inherit'
              )}
              onClick={() => handleLike(song.id)}
            >
              {isSubmitting(song.id, 'update_likes') ? (
                <motion.span
                  animate={{
                    scale: [0.5, 1],
                    transition: { duration: 0.2, repeat: Infinity },
                  }}
                  className="h-4 w-4 rounded-full block border-yellow border-1 absolute inset-0"
                />
              ) : (
                <Icon.LikeSVG className="absolute inset-0" />
              )}

              <span className="sr-only">Like track {song.title}</span>
            </button>

            <button
              disabled={isSubmitting(song.id, 'increment_download')}
              name="_action"
              value="increment_download"
              onClick={() => handleDownload(song.id, song.source, song.title)}
              className="h-4 w-4 relative"
            >
              {isSubmitting(song.id, 'increment_download') ? (
                <motion.span
                  animate={{
                    scale: [0.5, 1],
                    transition: { duration: 0.2, repeat: Infinity },
                  }}
                  className="h-4 w-4 rounded-full block border-yellow border-1 absolute inset-0"
                />
              ) : (
                <Icon.DownloadSVG className="absolute inset-0" />
              )}
              <span className="sr-only">Download track {song.title}</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
