/**
 * The public AVELUNE site has no database dependency. This deliberate stub
 * keeps the former template module import-safe in standard Next.js builds.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- legacy template examples are intentionally disabled in the public site.
export function getDb(): any {
  throw new Error("The public AVELUNE website does not use a database.");
}
