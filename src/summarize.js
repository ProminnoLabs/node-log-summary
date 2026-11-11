export async function summarize(lines) {
  const counts = { info: 0, warn: 0, error: 0 };
  let lineNumber = 0;

  for await (const line of lines) {
    lineNumber += 1;
    if (!line.trim()) continue;

    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      throw new Error(`Line ${lineNumber}: invalid JSON`);
    }

    const level = entry?.level;
    if (typeof level !== 'string' || !Object.hasOwn(counts, level)) {
      throw new Error(`Line ${lineNumber}: expected info, warn, or error`);
    }
    counts[level] += 1;
  }

  return counts;
}
