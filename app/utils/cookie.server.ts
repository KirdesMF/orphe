import { createCookieSessionStorage } from 'remix';

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: 'sb:session',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
  },
});
