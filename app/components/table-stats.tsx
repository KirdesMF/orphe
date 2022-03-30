import type { Song } from '~/models/song';

type Props = {
  datas: Array<Song>;
};
export function TableStats(props: Props) {
  return (
    <table className="border-collapse w-full">
      <caption className="p-4">Stats</caption>
      <thead className="sr-only md:not-sr-only text-left">
        <tr>
          <Th content="Title" />
          <Th content="Listened" />
          <Th content="Downloaded" />
        </tr>
      </thead>
      <tbody>
        {props.datas.map((song) => (
          <tr
            key={song.id}
            className="border-1 border-gray bg-gray-900 block md:table-row not-last:mb-6"
          >
            <Td label="Title" content={song.title} />
            <Td label="Listening" content={song.listening} />
            <Td label="Downloaded" content={song.downloaded} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Th({ content }: { content: string }) {
  return (
    <th className="p-4" scope="col">
      {content}
    </th>
  );
}

function Td({ label, content }: { label: string; content: number | string }) {
  return (
    <td
      data-label={label}
      className="p-4 before:content-[attr(data-label)] md:before:sr-only flex justify-between md:table-cell"
    >
      {content}
    </td>
  );
}
