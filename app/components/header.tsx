import { OrpheLyreSVG } from './custom-svg';
import { HeadPhoneSVG } from './icons';

export function Header() {
  return (
    <header className="flex justify-between px-10 py-6">
      <a
        href="https://orphe-ob.fr"
        className="flex items-center gap-x-2 text-white"
      >
        <span className="h-8 w-8">
          <OrpheLyreSVG />
        </span>
        <span className="font-200 uppercase italic whitespace-nowrap display-none sm:block">
          Orphe - CCV
        </span>
      </a>

      <a
        href="#player"
        className="flex items-center gap-x-2 bg-white text-black border-1 border-white px-4 py-2 rounded-2"
      >
        <span className="h-6 w-6">
          <HeadPhoneSVG />
        </span>
        <span>Écouter CCV</span>
      </a>
    </header>
  );
}
