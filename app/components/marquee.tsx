export function Marquee(props: { content: string }) {
  return (
    <div className="marquee">
      <div className="marquee__inner h-[2.5rem]">
        {Array.from({ length: 5 }, (_, idx) => (
          <span key={idx}>{props.content}</span>
        ))}
      </div>
    </div>
  );
}
