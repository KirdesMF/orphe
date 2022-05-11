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

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: resetStyles },
  { rel: 'stylesheet', href: mainStyles },
  { rel: 'stylesheet', href: unocssStyles },
  {
    rel: 'preload',
    as: 'font',
    href: '/fonts/variables/Manrope[wght].woff2',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Orphe',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="fr">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-white font-manrope">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
