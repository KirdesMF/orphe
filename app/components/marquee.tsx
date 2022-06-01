export function Marquee(props: { content: string }) {
  return (
    <div className="marquee font-200 text-2xl uppercase">
      <div className="marquee__inner h-[5rem] py-2">
        {Array.from({ length: 5 }, (_, idx) => (
          <span
            className="odd:text-[var(--red)] underline underline-offset-2"
            key={idx}
          >
            {props.content}
          </span>
        ))}
      </div>
    </div>
  );
}
