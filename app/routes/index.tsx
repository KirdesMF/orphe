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
import {
<<<<<<< HEAD
=======
  ArrowDownSVG,
>>>>>>> 2c7c8fbfad15852d764aaf8685e479f23a996c2f
  HeadPhoneSVG,
  InstagramSVG,
  SnapChatSVG,
  TikTokSVG,
  YouTubeSVG,
} from '~/components/icons';
import { LinearGradientSVG } from '~/components/custom-svg';
import { Separator } from '~/components/separator';
<<<<<<< HEAD
=======
import { SocialMedias } from '~/components/social-media';
>>>>>>> 2c7c8fbfad15852d764aaf8685e479f23a996c2f

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
    <>
      <main className="px-10">
        <LinearGradientSVG />

        <section className="py-40">
          <div className=" max-w-6xl mx-auto">
            <article className="grid gap-y-8">
              <h1 className="font-900 italic uppercase text-clamp-4xl max-w-[15ch] leading-none">
                ORPHE CCV NetTape 2022.
              </h1>
              <p className="max-w-[45ch] text-clamp-sm font-100 italic">
                OB Production et OB Publishing ont sélectionné plus de 20 titres
                pour composer la netTape CCV afin de vous faire découvrir leur
                artiste ORPHE en attendant la prochaine sortie de son 1er
                projet.
              </p>
              <a
                href="#player"
                className="flex items-center gap-x-2 bg-white text-black border-1 border-white px-4 py-2 rounded-2  w-min"
              >
                <span className="h-6 w-6">
                  <HeadPhoneSVG />
                </span>
                <span className="whitespace-nowrap">
                  Écouter ou télécharger CCV
                </span>
              </a>
            </article>
          </div>
        </section>

        <Separator />

<<<<<<< HEAD
        <section className="py-20">
          <div className="max-w-6xl mx-auto grid gap-y-10">
            <article>
              <h2 className="font-900 italic uppercase text-clamp-3xl">
                ORPHE ?
=======
        <section className="py-40">
          <div className="max-w-6xl mx-auto grid gap-y-10">
            <article>
              <h2 className="font-900 italic uppercase text-clamp-3xl">
                QUI EST ORPHE ?
>>>>>>> 2c7c8fbfad15852d764aaf8685e479f23a996c2f
              </h2>
              <p className="italic font-100 text-clamp-xs max-w-[50ch] mt-2">
                ORPHE est un jeune artiste de la région parisienne, produit par
                OB production. S'inspirant de plusieurs univers tel que la Pop
                ou le rap, ORPHE vous propose de le découvrir sur plus de 20
                titres. Son premier projet étant en préparation, vous pouvez le
                suivre sur les réseaux sociaux ou regarder ces deux clips
                vidéos.
              </p>
            </article>

            <hr className="w-full h-1 bg-white" />

            <div className="flex justify-evenly flex-wrap gap-6">
              <a
                href="https://www.youtube.com/channel/UCgmpOdwE6Zu0KFlHAnhRcYQ"
                className="grid gap-2 place-items-center w-min text-[var(--red)]"
              >
                <span className="font-800 text-6xl">2</span>
                <div className="flex items-center gap-x-2">
                  <YouTubeSVG className="h-6 w-6" />
                  <span className="whitespace-nowrap">Vidéos</span>
                </div>
              </a>

              <p className="grid gap-2 place-items-center text-[var(--red)]">
                <span className="font-800 text-6xl">+ 20</span>
                <span>Titres</span>
              </p>

              <p className="grid gap-2 place-items-center text-[var(--red)]">
                <span className="font-800 text-6xl">1</span>
                <span>Projet à venir</span>
              </p>
            </div>

            <hr className="w-full h-1 bg-white" />

            <div className="flex gap-6 justify-evenly flex-wrap">
              <a
                className="bg-white text-black flex items-center gap-x-2 border-1 border-white px-4 py-2 rounded-2 w-min"
                href="https://www.instagram.com/orphe350/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Orphe"
              >
                <span className="h-6 w-6 ">
                  <InstagramSVG />
                </span>

                <span className="font-200">Instagram</span>
              </a>

              <a
                className="bg-white text-black flex items-center gap-x-2 border-1 border-white px-4 py-2 rounded-2 w-min"
                href="https://www.snapchat.com/add/badou-orlov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat Orphe"
              >
                <span className="h-6 w-6 ">
                  <SnapChatSVG />
                </span>
                <span className="font-200">Snapchat</span>
              </a>

              <a
                className="bg-white text-black flex items-center gap-x-2 border-1 border-white px-4 py-2 rounded-2 w-min"
                href="https://www.tiktok.com/@orphe350"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Orphe"
              >
                <span className="h-6 w-6 ">
                  <TikTokSVG />
                </span>

                <span className="font-200">TikTok</span>
              </a>
            </div>
          </div>
        </section>

        <Separator />

        <section
          id="player"
<<<<<<< HEAD
          className="min-h-[100vh] flex flex-col justify-center items-center py-20"
=======
          className="min-h-[100vh] flex flex-col justify-center items-center"
>>>>>>> 2c7c8fbfad15852d764aaf8685e479f23a996c2f
        >
          <AudioPlayer songs={songs} user_likes={user_likes} />
        </section>
      </main>
      <footer className="py-3 flex items-center justify-center font-200 text-xs">
        <small>ObProduction - Ob Publishing ©copyright 2022</small>
      </footer>
    </>
  );
}
