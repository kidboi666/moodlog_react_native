import { count } from 'drizzle-orm'

import { sqliteDb } from '@/src/db/sqlite'
import { journals } from '@/src/db/sqlite/schema'

export async function getTotalCount() {
  const [{ count: journalCount }] = await sqliteDb
    .select({ count: count() })
    .from(journals)
  return journalCount
}
