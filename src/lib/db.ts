import { neon } from "@neondatabase/serverless";

// Lazily initialise so the build doesn't fail when DATABASE_URL isn't set
let _sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql;
}

// Convenience wrapper — returns null if DB is not configured
export async function query<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<T[] | null> {
  const sql = getDb();
  if (!sql) return null;
  try {
    const rows = await sql(strings, ...values);
    return rows as T[];
  } catch (error) {
    console.error("[db] query error:", error);
    return null;
  }
}
