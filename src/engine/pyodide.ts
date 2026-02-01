export async function analyzePythonInBrowser(source: string) {
  // Phase 1 stub: return a consistent “analysis”
  // Phase 2: replace this with real Pyodide execution (AST + dis + opcode counts)
  const fakeBytecode = [
    "LOAD_FAST 0",
    "LOAD_FAST 0",
    "BINARY_MULTIPLY",
    "RETURN_VALUE",
  ].join("\n");

  const opcodeCounts: Record<string, number> = {
    LOAD_FAST: 2,
    BINARY_MULTIPLY: 1,
    RETURN_VALUE: 1,
  };

  const astSummary = {
    functions: (source.match(/def\s+/g) || []).length,
    loops: (source.match(/\bfor\b|\bwhile\b/g) || []).length,
    comprehensions: (source.match(/\[.*for.*in.*\]/g) || []).length,
  };

  return {
    ast_summary: astSummary,
    bytecode: fakeBytecode,
    opcode_counts: opcodeCounts,
  };
}
