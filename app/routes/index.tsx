import { json, Link, useLoaderData } from 'remix';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction, ActionFunction } from 'remix';
import type { Song } from '~/models/song';
import { CustomPlayer } from '~/components/custom-player';
import { useState } from 'react';
import { CountDown } from '~/components/countdown';

type Loader = {
  songs: Array<Song>;
  dates: { targetDate: number; timeLeft: number };
};

export const loader: LoaderFunction = async () => {
  const { data: songs } = await supabase
    .from<Song>('Song')
    .select('*')
    .order('id');

  const targetDate = new Date('04/30/2022').getTime();
  const timeLeft = targetDate - new Date().getTime();

  return json({ songs, dates: { targetDate, timeLeft } });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { _action, ...values } = Object.fromEntries(form);

  if (_action === 'increment') {
    await supabase.rpc('increment_listening', { row_id: values.id });
    return json({ ok: true });
  }

  if (_action === 'download') {
    await supabase.rpc('increment_download', { row_id: values.id });
    return json({ ok: true });
  }

  return null;
};

export default function Index() {
  const { songs, dates } = useLoaderData<Loader>();
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <main className="bg-black text-white font-sans px-4xl py-6xl">
      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        <CountDown targetDate={dates.targetDate} timeLeft={dates.timeLeft} />
      </section>

      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        <Link to="/dashboard">Dashboard</Link>
        <div className="h-md overflow-y-scroll">
          {songs.map((song) => (
            <ul key={song.id} className="odd:bg-zinc-900 even:bg-zinc-800">
              <li className="px-4 py-4">
                <CustomPlayer
                  id={song.id}
                  src={song.source}
                  title={song.title}
                  currentSong={currentSong}
                  setCurrentSong={setCurrentSong}
                />
              </li>
            </ul>
          ))}
        </div>
      </section>
    </main>
  );
}
