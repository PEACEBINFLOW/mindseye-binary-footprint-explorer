export default function BytecodePanel({ bytecode }: { bytecode: string }) {
  return (
    <div style={{ padding: 12, borderRadius: 12, background: "#071319", border: "1px solid rgba(143,239,255,0.18)" }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Bytecode</div>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{bytecode || "(none)"}</pre>
    </div>
  );
}
