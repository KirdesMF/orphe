export function Marquee(props: { content: string }) {
  return (
    <div className="sticky w-full top-0 bg-[var(--black)]">
      <div className="overflow-x-hidden h-[5rem] whitespace-nowrap flex items-center gap-x-10">
        {Array.from({ length: 5 }, (_, idx) => (
          <p key={idx}>{props.content}</p>
        ))}
      </div>
    </div>
  );
}
