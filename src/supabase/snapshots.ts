import { supabase } from "./client";

export type SnapshotRow = {
  id: string;
  created_at: string;
  title: string;
  language: string;
  code_hash: string | null;
  source_code: string | null;
  analysis_json: any;
  is_public: boolean;
};

export async function createPublicSnapshot(input: {
  title: string;
  analysis_json: any;
  language?: "python";
  code_hash?: string;
  source_code?: string | null;
}) {
  const { data, error } = await supabase
    .from("snapshots")
    .insert([
      {
        title: input.title,
        language: input.language ?? "python",
        analysis_json: input.analysis_json,
        code_hash: input.code_hash ?? null,
        source_code: input.source_code ?? null,
        is_public: true,
      },
    ])
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function fetchPublicSnapshot(id: string) {
  const { data, error } = await supabase
    .from("snapshots")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as SnapshotRow;
}
