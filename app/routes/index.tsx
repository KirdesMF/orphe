import { getSongs, supabase } from '~/utils/supabase.server';
import { commitDataSession, getDataSession } from '~/utils/cookie.server';
import { AudioPlayer } from '~/components/audio-player';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Song } from '~/models/song';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { OrpheLogo } from '~/components/orphe-logo';
import { motion } from 'framer-motion';

type Loader = {
  songs: Array<Song>;
  user_likes: Array<string>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const [session, songs] = await Promise.all([
    getDataSession(request.headers.get('Cookie')),
    getSongs(),
  ]);

  return json({
    songs,
    user_likes: session.get('user_likes') || [],
  });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const { _action, ...values } = Object.fromEntries(form);

  if (_action === 'increment_listening') {
    return await supabase.rpc('increment_listening', { row_id: values.id });
  }

  if (_action === 'increment_download') {
    return await supabase.rpc('increment_download', { row_id: values.id });
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
      { song: values.id },
      {
        headers: {
          'Set-Cookie': await commitDataSession(session),
        },
      }
    );
  }
};

export default function Index() {
  const { songs, user_likes } = useLoaderData<Loader>();

  return (
    <main className="px-4xl">
      <section className="min-h-[100vh] flex flex-col items-center justify-center">
        <motion.div
          animate={{ opacity: [0, 1] }}
          className="grid place-items-center gap-y-2"
        >
          <OrpheLogo />
          <h1 className="text-sm">OB production présente</h1>
        </motion.div>
      </section>
      <section className="min-h-[100vh] flex flex-col justify-center items-center">
        <AudioPlayer songs={songs} user_likes={user_likes} />
      </section>
    </main>
  );
}
