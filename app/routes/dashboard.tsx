import { json, Link, useLoaderData } from 'remix';
import { TableStats } from '~/components/table-stats';
import type { Song } from '~/models/song';
import { supabase } from '~/utils/supabase.server';

export const loader = async () => {
  const { data } = await supabase
    .from<Song>('Song')
    .select('*')
    .select('downloaded,listening,title,id');

  return json(data);
};

export default function Index() {
  const datas = useLoaderData<Array<Song>>();

  return (
    <main className="bg-black text-white font-sans px-4xl py-6xl">
      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        <Link to="/">Back Home</Link>
        <TableStats datas={datas} />
      </section>
    </main>
  );
}
