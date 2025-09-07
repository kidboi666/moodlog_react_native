import { sqliteDb } from '@/src/data/database/sqlite'
import { journals } from '@/src/data/database/sqlite/schema'
import { count } from 'drizzle-orm'

export async function getTotalCount() {
  const [{ count: journalCount }] = await sqliteDb
    .select({ count: count() })
    .from(journals)
  return journalCount
}
