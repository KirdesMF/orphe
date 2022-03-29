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
          <th className="p-4" scope="col">
            Title
          </th>
          <th className="p-4" scope="col">
            Listening
          </th>
          <th className="p-4" scope="col">
            Downloaded
          </th>
        </tr>
      </thead>
      <tbody>
        {props.datas.map((song) => (
          <tr
            key={song.id}
            className="border-1 border-gray bg-gray-900 block md:table-row not-last:mb-6"
          >
            <td
              data-label="Title"
              className="p-4 before:content-[attr(data-label)] md:before:sr-only flex justify-between md:table-cell"
            >
              {song.title}
            </td>
            <td
              data-label="Listening"
              className="p-4 before:content-[attr(data-label)] md:before:sr-only flex justify-between md:table-cell"
            >
              {song.listening}
            </td>
            <td
              data-label="Downloaded"
              className="p-4 before:content-[attr(data-label)] md:before:sr-only flex justify-between md:table-cell"
            >
              {song.downloaded}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
