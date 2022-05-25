import { getSongs, supabase } from '~/utils/supabase.server';
import { commitDataSession, getDataSession } from '~/utils/cookie.server';
import { AudioPlayer } from '~/components/audio-player';
import {
  CCVSVG,
  OBProdSVG,
  OrpheGreekSVG,
  OrpheLyreSVG,
} from '~/components/custom-svg';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { Song } from '~/models/song';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { InstagramSVG, SnapChatSVG, TikTokSVG } from '~/components/icons';
import { Marquee } from '~/components/marquee';

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
    <main className="px-2xl relative">
      <span
        aria-hidden
        className="absolute w-[15vmax] h-[15vmax] text-white -top-10 -left-10 -rotate-15"
      >
        <OrpheLyreSVG />
      </span>

      <section className="min-h-[100vh] flex flex-col items-center justify-center">
        <article className="grid place-items-center gap-y-6xl">
          <a
            href="https://www.instagram.com/obprod/"
            className=" grid place-items-center"
            aria-label="Instagram ObProd"
          >
            <span className="h-15 w-15 text-white hover:text-[var(--red)] ease-in duration-200">
              <OBProdSVG />
            </span>
          </a>

          <h1 className="grid place-items-center">
            <span className="sr-only">Orphe CCV NetTape</span>
            <span aria-hidden className="overflow-hidden w-[20vmax]">
              <OrpheGreekSVG />
            </span>
            <span aria-hidden className="overflow-hidden w-[20vmax]">
              <CCVSVG />
            </span>
          </h1>

          <nav className="flex gap-x-5">
            <a
              className="text-white h-8 w-8"
              href="https://www.instagram.com/orphe350/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Orphe"
            >
              <InstagramSVG />
            </a>

            <a
              className="text-white h-8 w-8"
              href="https://www.snapchat.com/add/badou-orlov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat Orphe"
            >
              <SnapChatSVG />
            </a>

            <a
              className="text-white h-8 w-8"
              href="https://www.tiktok.com/@orphe350"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Orphe"
            >
              <TikTokSVG />
            </a>
          </nav>
        </article>
      </section>

      <article className="grid gap-y-5 justify-center text-2xl">
        <p className="max-w-[35ch] text-center font-800">
          En attendant son premier projet, découvrez l'univers d'
          <span className="text-[var(--red)]"> Orphe</span> à travers sa NetTape
          <span className="text-[var(--red)]"> CCV</span>. Les musiques sont
          disponibles en streaming ou en téléchargement
          <span className="text-[var(--red)]"> 100% gratuit</span>.
        </p>
      </article>

      <section className="min-h-[100vh] flex flex-col justify-center items-center">
        <AudioPlayer songs={songs} user_likes={user_likes} />
      </section>
    </main>
  );
}
