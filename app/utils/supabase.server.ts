import { createClient } from '@supabase/supabase-js';
import type { Song } from '~/models/song';

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export async function getSongs() {
  const { data: songs } = await supabase
    .from<Song>('Song')
    .select('id,source,title,likes,listening,video')
    .order('id');

  return songs;
}
