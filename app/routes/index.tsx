import { json, useLoaderData } from 'remix';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction } from 'remix';
import type { Song } from '~/models/song';
import { CustomPlayer } from '~/components/custom-player';
import { useState } from 'react';
import { CountDown } from '~/components/countdown';

export const loader: LoaderFunction = async () => {
  const { data: songs } = await supabase.from('Song').select('*');

  return json(songs);
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
        <article className="h-md overflow-y-scroll grid">
          {datas.map((song) => (
            <div
              key={song.id}
              className="px-4 py-4 odd:bg-zinc-900 even:bg-zinc-800"
            >
              <p>{song.title}</p>
              <CustomPlayer
                id={song.id}
                src={song.source}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
              />
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
