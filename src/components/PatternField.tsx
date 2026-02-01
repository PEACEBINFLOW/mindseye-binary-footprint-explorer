import type { PatternTag } from "../engine/mapper";

export default function PatternField({ tags }: { tags: PatternTag[] }) {
  return (
    <div style={{ padding: 12, borderRadius: 12, background: "#071319", border: "1px solid rgba(143,239,255,0.18)" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Pattern Field</div>
      {tags.length === 0 ? (
        <div style={{ opacity: 0.7 }}>No tags yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tags.map((t) => (
            <div key={t.tag}>
              <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.9 }}>
                <span>{t.tag}</span>
                <span>{Math.round(t.score * 100)}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ width: `${Math.round(t.score * 100)}%`, height: "100%", background: "rgba(143,239,255,0.75)" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
