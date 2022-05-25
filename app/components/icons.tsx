export function PlaySVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"
      ></path>
    </svg>
  );
}

export function PauseSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path fill="currentColor" d="M10 4H5v16h5V4zm9 0h-5v16h5V4z"></path>
    </svg>
  );
}

export function SoundSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M11 2h2v20h-2v-2H9v-2h2V6H9V4h2V2zM7 8V6h2v2H7zm0 8H3V8h4v2H5v4h2v2zm0 0v2h2v-2H7zm10-6h-2v4h2v-4zm2-2h2v8h-2V8zm0 8v2h-4v-2h4zm0-10v2h-4V6h4z"
      ></path>
    </svg>
  );
}

export function MuteSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M13 2h-2v2H9v2H7v2H3v8h4v2h2v2h2v2h2V2zM9 18v-2H7v-2H5v-4h2V8h2V6h2v12H9zm10-6.777h-2v-2h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2v-2zm0 0h2v-2h-2v2z"
      ></path>
    </svg>
  );
}

export function NextSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M16 12.667L5.777 19.482A.5.5 0 0 1 5 19.066V4.934a.5.5 0 0 1 .777-.416L16 11.333V5a1 1 0 0 1 2 0v14a1 1 0 0 1-2 0v-6.333z"
      ></path>
    </svg>
  );
}

export function PrevSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="m8 11.333l10.223-6.815a.5.5 0 0 1 .777.416v14.132a.5.5 0 0 1-.777.416L8 12.667V19a1 1 0 0 1-2 0V5a1 1 0 1 1 2 0v6.333z"
      ></path>
    </svg>
  );
}

export function LikeSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228a6 6 0 0 1 .236 8.236l-8.48 8.492l-8.478-8.492a6 6 0 0 1 8.48-8.464z"
      ></path>
    </svg>
  );
}

export function DownloadSVG({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M3 19h18v2H3v-2zM13 9h7l-8 8l-8-8h7V1h2v8z"></path>
    </svg>
  );
}

export function InstagramSVG() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      fill="currentColor"
    >
      <title>Instagram</title>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}

export function SnapChatSVG() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      fill="currentColor"
    >
      <title>Snapchat</title>
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  );
}

export function YouTubeSVG() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      fill="currentColor"
    >
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TikTokSVG() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden
      focusable={false}
      width="100%"
      height="100%"
      fill="currentColor"
    >
      <title>TikTok</title>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function ArrowDownSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      width="100%"
      height="100%"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
