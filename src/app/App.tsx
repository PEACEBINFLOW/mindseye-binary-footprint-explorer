import { useMemo, useState } from "react";
import Editor from "../components/Editor";
import ASTPanel from "../components/ASTPanel";
import BytecodePanel from "../components/BytecodePanel";
import PatternField from "../components/PatternField";
import SnapshotPanel from "../components/SnapshotPanel";
import { analyzePythonInBrowser } from "../engine/pyodide";
import { mapToPatternTags } from "../engine/mapper";

const DEFAULT_CODE = `def f(xs):
    return [x*x for x in xs]
`;

export default function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [title, setTitle] = useState("First Footprint");
  const [analysis, setAnalysis] = useState<any>(null);
  const [status, setStatus] = useState<string>("Ready.");

  const tags = useMemo(() => {
    if (!analysis?.opcode_counts) return [];
    return mapToPatternTags(analysis.opcode_counts);
  }, [analysis]);

  async function run() {
    setStatus("Analyzing…");
    try {
      const result = await analyzePythonInBrowser(code);
      const packed = {
        ...result,
        pattern_tags: mapToPatternTags(result.opcode_counts),
        meta: { created_local: new Date().toISOString() },
      };
      setAnalysis(packed);
      setStatus("Done.");
    } catch (e: any) {
      console.error(e);
      setStatus("Error.");
      alert(e?.message ?? "Analysis failed");
    }
  }

  return (
    <div style={{ minHeight: "100vh", padding: 18 }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Binary Footprint Explorer</div>
          <div style={{ opacity: 0.7, fontSize: 12 }}>
            AST + Bytecode + Pattern Field • Runs client-side • Snapshots via Supabase
          </div>
        </div>

        <button
          onClick={run}
          style={{
            borderRadius: 14,
            padding: "10px 14px",
            background: "rgba(143,239,255,0.22)",
            color: "#eaffff",
            border: "1px solid rgba(143,239,255,0.45)",
            cursor: "pointer",
            fontWeight: 900,
          }}
        >
          Run Analysis
        </button>
      </header>

      <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 12 }}>{status}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        <div style={{ minHeight: 520 }}>
          <Editor value={code} onChange={setCode} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SnapshotPanel
            title={title}
            setTitle={setTitle}
            analysis={analysis}
            onLoad={(row) => setAnalysis(row.analysis_json)}
          />
          <PatternField tags={analysis?.pattern_tags ?? tags} />
          <ASTPanel ast={analysis?.ast_summary} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <BytecodePanel bytecode={analysis?.bytecode ?? ""} />
      </div>
    </div>
  );
}
