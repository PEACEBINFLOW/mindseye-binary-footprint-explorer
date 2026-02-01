import { createPublicSnapshot, fetchPublicSnapshot } from "../supabase/snapshots";

type Props = {
  title: string;
  setTitle: (v: string) => void;
  analysis: any;
  onLoad: (snapshot: any) => void;
};

export default function SnapshotPanel({ title, setTitle, analysis, onLoad }: Props) {
  async function handleSave() {
    if (!analysis) return alert("Run analysis first.");
    const id = await createPublicSnapshot({
      title: title || "Untitled",
      analysis_json: analysis,
      language: "python",
      source_code: null,
    });
    const url = `${location.origin}${import.meta.env.BASE_URL}#/snapshot/${id}`;
    await navigator.clipboard.writeText(url);
    alert(`Saved. Link copied:\n${url}`);
  }

  async function handleLoad() {
    const id = prompt("Paste snapshot id:");
    if (!id) return;
    const row = await fetchPublicSnapshot(id.trim());
    onLoad(row);
  }

  return (
    <div style={{ padding: 12, borderRadius: 12, background: "#071319", border: "1px solid rgba(143,239,255,0.18)" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Snapshots</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Snapshot title"
          style={{
            flex: 1,
            borderRadius: 10,
            padding: "10px 12px",
            background: "#050a0d",
            color: "#eaffff",
            border: "1px solid rgba(143,239,255,0.25)",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            borderRadius: 12,
            padding: "10px 12px",
            background: "rgba(143,239,255,0.18)",
            color: "#eaffff",
            border: "1px solid rgba(143,239,255,0.35)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Save Public
        </button>

        <button
          onClick={handleLoad}
          style={{
            flex: 1,
            borderRadius: 12,
            padding: "10px 12px",
            background: "rgba(255,255,255,0.06)",
            color: "#eaffff",
            border: "1px solid rgba(255,255,255,0.12)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Load by ID
        </button>
      </div>

      <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
        Save copies a share link to your clipboard.
      </div>
    </div>
  );
}
