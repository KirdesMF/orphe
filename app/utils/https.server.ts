import { createWriteStream } from 'node:fs';
import https from 'node:https';

export function pipeStream(url: string, title: string) {
  https.get(url, (res) => {
    const path = `./${title}.mp3`;
    const writeStream = createWriteStream(path);

    res.pipe(writeStream);

    writeStream.on('finish', () => {
      writeStream.close();
      console.log('Download Completed');
      console.log(url);
    });
  });
}
