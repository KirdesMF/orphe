import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
} from 'remix';
import { commitSession, getSession } from '~/utils/cookie.server';
import { supabase } from '~/utils/supabase.server';

export const meta = () => ({
  title: 'Login',
});

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) return redirect('/');

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { user, error } = await supabase.auth.signIn({ email, password });

  if (user) {
    session.set('userId', user.id);
    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  return { error };
};
export default function Login() {
  const actionData = useActionData();

  return (
    <main className="bg-black text-white font-manrope px-4xl py-6xl">
      <section className="max-w-3xl mx-auto min-h-[100vh]">
        <Link to="/">Back Home</Link>
        <Form method="post" className="grid gap-4">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit" className="color-white bg-amber">
            Login
          </button>
          <p>{actionData?.error ? actionData?.error?.message : null}</p>
        </Form>
      </section>
    </main>
  );
}
