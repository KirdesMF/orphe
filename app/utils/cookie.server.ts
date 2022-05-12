import { createCookieSessionStorage } from '@remix-run/node';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'sb:session',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secrets: ['secret'],
    },
  });

export const {
  getSession: getDataSession,
  commitSession: commitDataSession,
  destroySession: destroyDataSession,
} = createCookieSessionStorage({
  cookie: {
    name: 'user:data',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secrets: ['other-secret'],
  },
});
