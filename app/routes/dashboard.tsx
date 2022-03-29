import { json, redirect, useLoaderData } from 'remix';
import type { Song } from '~/models/song';
import { supabase } from '~/utils/supabase.server';

export const loader = async () => {
  const { data } = await supabase
    .from<Song>('Song')
    .select('*')
    .select('downloaded,listening,title');

  return json(data);
};

export default function Index() {
  const datas = useLoaderData<Array<Song>>();

  return (
    <main className="bg-black text-white font-sans">
      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        {datas.map((song) => (
          <ul key={song.id}>
            <li className="flex gap-x-4">
              <span>Piste: {song.title}</span>
              <span>Download: {song.downloaded}</span>
              <span>Écoutes: {song.listening}</span>
            </li>
          </ul>
        ))}
      </section>
    </main>
  );
}
