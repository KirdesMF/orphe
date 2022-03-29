// create url from blob
// import {Blob} from 'buffer'
export function createUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}
