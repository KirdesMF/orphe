import { json, Link, useLoaderData } from 'remix';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction, ActionFunction } from 'remix';
import type { Song } from '~/models/song';
import { CustomPlayer } from '~/components/custom-player';
import { useState } from 'react';
import { CountDown } from '~/components/countdown';
import { commitDataSession, getDataSession } from '~/utils/cookie.server';

type Loader = {
  songs: Array<Song>;
  user_likes: Array<string>;
  dates: { targetDate: number; timeLeft: number };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getDataSession(request.headers.get('Cookie'));

  const { data: songs } = await supabase
    .from<Song>('Song')
    .select('id,source,title,likes,listening')
    .order('id');

  const targetDate = new Date('04/30/2022').getTime();
  const timeLeft = targetDate - new Date().getTime();

  return json({
    songs,
    user_likes: session.get('user_likes') || [],
    dates: { targetDate, timeLeft },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { _action, ...values } = Object.fromEntries(form);

  if (_action === 'increment_listening') {
    await supabase.rpc('increment_listening', { row_id: values.id });
    return { ok: values.id };
  }

  if (_action === 'increment_download') {
    await supabase.rpc('increment_download', { row_id: values.id });
    return { ok: values.id };
  }

  if (_action === 'update_likes') {
    const [session] = await Promise.all([
      getDataSession(request.headers.get('Cookie')),
      supabase.rpc('update_likes', {
        row_id: values.id,
        like_count: values.like,
      }),
    ]);

    // if there is no cookie yet, create one
    if (!session.has('user_likes')) session.set('user_likes', [values.id]);
    else {
      const user_likes = session.get('user_likes') as Array<string>;
      if (user_likes.includes(values.id as string))
        session.set(
          'user_likes',
          user_likes.filter((id) => id !== values.id)
        );
      else session.set('user_likes', [...user_likes, values.id]);
    }

    return json(
      { ok: values.id },
      {
        headers: {
          'Set-Cookie': await commitDataSession(session),
        },
      }
    );
  }

  return null;
};

export default function Index() {
  const { songs, dates, user_likes } = useLoaderData<Loader>();
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <main className="bg-black text-white font-manrope px-4xl">
      <section className="min-h-[100vh] grid place-items-center">
        <div>
          <h1 className="text-clamp-lg font-800 text-center">OB production</h1>
          <CountDown targetDate={dates.targetDate} timeLeft={dates.timeLeft} />
          <p>Orphe Bandana</p>
        </div>
      </section>

      <section className="min-h-[100vh] grid place-items-center">
        <div className="grid gap-y-4">
          <h2 className="text-clamp-md font-800">
            En attendant le nouveau projet
          </h2>
          <ul className="h-md overflow-y-scroll">
            {songs.map((song) => (
              <li
                key={song.id}
                className="px-4 py-4 odd:bg-zinc-900 even:bg-zinc-800"
              >
                <CustomPlayer
                  id={song.id}
                  src={song.source}
                  title={song.title}
                  likes={song.likes}
                  listening={song.listening}
                  currentSong={currentSong}
                  setCurrentSong={setCurrentSong}
                  hasLiked={user_likes.includes(`${song.id}`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
