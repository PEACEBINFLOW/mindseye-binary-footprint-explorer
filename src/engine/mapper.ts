export type PatternTag = { tag: string; score: number };

export function mapToPatternTags(opcodeCounts: Record<string, number>): PatternTag[] {
  const total = Object.values(opcodeCounts).reduce((a, b) => a + b, 0) || 1;

  const get = (k: string) => (opcodeCounts[k] ?? 0) / total;

  // Heuristics (MVP-level, we’ll refine once Pyodide is real)
  const dispatch = Math.min(1, get("LOAD_GLOBAL") + get("CALL") + get("CALL_FUNCTION") + get("PRECALL"));
  const loops = Math.min(1, get("JUMP_BACKWARD") + get("FOR_ITER") + get("JUMP_ABSOLUTE"));
  const branch = Math.min(1, get("POP_JUMP_IF_FALSE") + get("POP_JUMP_IF_TRUE"));
  const allocish = Math.min(1, get("BUILD_LIST") + get("BUILD_MAP") + get("BUILD_TUPLE") + get("LIST_APPEND"));
  const hashish = Math.min(1, get("BINARY_SUBSCR") + get("STORE_SUBSCR"));

  const tags: PatternTag[] = [
    { tag: "DISPATCH", score: dispatch },
    { tag: "LOOP", score: loops },
    { tag: "BRANCH", score: branch },
    { tag: "ALLOC-ish", score: allocish },
    { tag: "HASH-ish", score: hashish },
  ];

  // Keep only meaningful
  return tags.filter(t => t.score > 0.05).sort((a, b) => b.score - a.score);
}
