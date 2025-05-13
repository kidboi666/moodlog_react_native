import { count, sql } from 'drizzle-orm'
import { db } from '../../db'
import { journals } from '../../db/schema'

export async function getTotalCount() {
  const [{ count: journalCount }] = await db
    .select({ count: count() })
    .from(journals)
  return journalCount
}
