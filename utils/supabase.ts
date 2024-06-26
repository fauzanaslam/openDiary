import { createClient } from "@supabase/supabase-js";
import { UUID } from "crypto";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export interface IDiary {
  diary_id?: number;
  content: string;
  diary_image?: string | undefined | null;
  email: string | undefined;
  username?: string | null;
  avatar: string | undefined;
  created_at?: string;
  comments?: Array<IComments>;
  randomID?: UUID;
  topics?: string[];
}

export interface IComments extends IDiary {
  comment_id: any;
}
