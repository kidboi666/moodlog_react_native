import { sql } from 'drizzle-orm'
import { db } from '../../db'
import { journals } from '../../db/schema'

export async function getTotalCount() {
  return db.select({ value: sql`count('*'))`.mapWith(Number) }).from(journals)
}
