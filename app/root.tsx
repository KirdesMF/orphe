import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import resetStyles from './styles/reset.css';
import mainStyles from './styles/main.css';
import unocssStyles from './styles/unocss.css';
import { Marquee } from './components/marquee';
import { LinearGradientSVG } from './components/custom-svg';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: resetStyles, as: 'style' },
  { rel: 'stylesheet', href: mainStyles, as: 'style' },
  { rel: 'stylesheet', href: unocssStyles, as: 'style' },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/variables/Manrope[wght].woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'icon',
    href: '/favicon/favicon.ico',
    sizes: 'any',
  },
  {
    rel: 'icon',
    href: '/favicon/orphe-logo-final.svg',
    type: 'image/svg+xml',
  },
  {
    rel: 'apple-touch-icon',
    href: '/favicon/apple-touch-icon.png',
    sizes: '180x180',
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon/favicon-32x32.png',
    sizes: '32x32',
  },

  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon/favicon-16x16.png',
    sizes: '16x16',
  },
  { rel: 'manifest', href: 'favicon/site.webmanifest' },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Orphe',
  viewport: 'width=device-width,initial-scale=1',
  description:
    'Ob production présente Orphe et offre sa NetTape CCV en attendant son premier projet. Plus de 20 titres en écoute et téléchargements 100% gratuits',
  keywords:
    'ObProd, musique, studio, production, Orphe, NetTape, CCV, titres, écoute, téléchargement, gratuit',
});

export default function App() {
  return (
    <html lang="fr">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[var(--black)] text-white font-manrope">
        <LinearGradientSVG />
        {/* <Marquee content="Écoutes et téléchargements 100% gratuits" /> */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
