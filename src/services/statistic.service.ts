import { count, sql } from 'drizzle-orm'
import { sqliteDb } from '../../db/sqlite'
import { journals } from '../../db/sqlite/schema'

export async function getTotalCount() {
  const [{ count: journalCount }] = await sqliteDb
    .select({ count: count() })
    .from(journals)
  return journalCount
}
