export function Separator() {
  return (
    <div className="h-[100px] w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        aria-hidden
        focusable={false}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="separator-gradient">
            <stop offset="5%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--red)" />
            <stop offset="95%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {Array.from({ length: 5 }, (_, idx) => {
          return (
            <rect
              width="100"
              height="20"
              fill={idx % 2 === 0 ? 'url(#separator-gradient)' : 'none'}
              x="0"
              y={idx * 20}
            />
          );
        })}
      </svg>
    </div>
  );
}
