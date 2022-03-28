import { json, Link, useLoaderData } from 'remix';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction } from 'remix';
import type { Song } from '~/models/song';

export const loader: LoaderFunction = async () => {
  const { data: songs, error } = await supabase.from('Song').select('*');

  return json(songs);
};

export default function Index() {
  const datas = useLoaderData<Array<Song>>();

  return (
    <div className="grid gap-10 text-base">
      <Link to="/dashboard">Dashboard</Link>
      <h1>Orphe</h1>
      {datas.map((song) => (
        <div key={song.id}>
          <p>{song.title}</p>
          <audio src={song.source} controls></audio>
        </div>
      ))}
    </div>
  );
}
