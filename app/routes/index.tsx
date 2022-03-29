import { json, useLoaderData } from 'remix';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction, ActionFunction } from 'remix';
import type { Song } from '~/models/song';
import { CustomPlayer } from '~/components/custom-player';
import { useState } from 'react';
import { CountDown } from '~/components/countdown';

export const loader: LoaderFunction = async () => {
  const { data: songs } = await supabase
    .from<Song>('Song')
    .select('*')
    .order('id');

  return json(songs);
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
  const datas = useLoaderData<Array<Song>>();
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <main className="bg-black text-white font-sans">
      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        <CountDown targetDate="03/30/2022" />
      </section>

      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        <div className="h-md overflow-y-scroll">
          {datas.map((song) => (
            <ul
              key={song.id}
              className="px-4 py-4 odd:bg-zinc-900 even:bg-zinc-800"
            >
              <li>
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
