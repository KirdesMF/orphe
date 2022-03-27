import { json, useLoaderData } from 'remix';
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
      <h1>Welcome to Vercel Beau gosse ok</h1>
      {datas.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}
    </div>
  );
}
