import { InstagramSVG, SnapChatSVG, TikTokSVG } from './icons';

export function SocialMedias() {
  return (
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
  );
}
