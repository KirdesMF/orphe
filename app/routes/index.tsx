import { json, Link, useLoaderData } from 'remix';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction } from 'remix';
import type { Song } from '~/models/song';
import { CustomPlayer } from '~/components/custom-player';
import { useState } from 'react';

export const loader: LoaderFunction = async () => {
  const { data: songs, error } = await supabase.from('Song').select('*');

  return json(songs);
};

export default function Index() {
  const datas = useLoaderData<Array<Song>>();
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className="grid gap-10 text-base">
      <Link to="/dashboard">Dashboard</Link>
      <h1>Orphe</h1>
      {datas.map((song) => (
        <div key={song.id}>
          <p>{song.title}</p>
          <CustomPlayer
            id={song.id}
            src={song.source}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
        </div>
      ))}
    </div>
  );
}
