import { json, redirect } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { TableStats } from '~/components/table-stats';
import { getSession } from '~/utils/cookie.server';
import { supabase } from '~/utils/supabase.server';

import type { LoaderFunction } from '@remix-run/node';
import type { Song } from '~/models/song';

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) return redirect('/login');

  const { data } = await supabase
    .from<Song>('Song')
    .select('downloaded,listening,title,id,likes')
    .order('listening', { ascending: false });

  return json(data);
};

export default function Index() {
  const datas = useLoaderData<Array<Song>>();

  return (
    <main className="bg-black text-white font-manrope px-4xl py-6xl">
      <section className="max-w-3xl mx-auto min-h-[100vh] grid place-items-center">
        <Link to="/">Back Home</Link>
        <TableStats datas={datas} />
      </section>
    </main>
  );
}
