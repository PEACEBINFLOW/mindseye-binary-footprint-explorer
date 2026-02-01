type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function Editor({ value, onChange }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <div style={{ fontWeight: 700, opacity: 0.9 }}>Python Source</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        style={{
          flex: 1,
          width: "100%",
          resize: "none",
          borderRadius: 12,
          padding: 12,
          background: "#071319",
          color: "#eaffff",
          border: "1px solid rgba(143,239,255,0.25)",
          outline: "none",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 13,
          lineHeight: 1.4,
        }}
      />
    </div>
  );
}
