function removeLineReturns(str: string): string {
  return str.replaceAll(/(\r\n|\n|\r)/gm, " ").trim();
}

export function sanitizePgn(pgn: string): string {
  pgn = pgn.trim();
  pgn = removeLineReturns(pgn);

  return pgn
    .split("[Event ")
    .join(`\n\n[Event `)
    .trim();
}
