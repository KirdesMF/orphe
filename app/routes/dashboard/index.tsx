import { redirect } from 'remix';

export const loader = async () => {
  return redirect('/dashboard/login');
};

export default function Index() {
  return <main>DashBoard</main>;
}
