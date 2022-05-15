import { createCookieSessionStorage } from '@remix-run/node';
import { daysToSeconds } from './utils';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'sb:session',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: daysToSeconds(365),
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
    secure: true,
    httpOnly: true,
    maxAge: daysToSeconds(365),
    secrets: ['other-secret'],
  },
});
