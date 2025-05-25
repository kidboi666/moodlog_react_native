import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const timestamp = {
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
}

export const journals = sqliteTable('journals', {
  id: int('id').primaryKey({ autoIncrement: true }),
  content: text('content'),
  moodName: text('mood_level').notNull(),
  imageUri: text('image_uri'),
  localDate: text('local_date').default(sql`(CURRENT_DATE)`),
  ...timestamp,
})

export const stats = sqliteTable('stats', {
  id: int('id').primaryKey({ autoIncrement: true }),
  currentStreak: int('current_streak').default(0),
  maxStreak: int('max_streak').default(0),
  lastActiveDate: text('last_active_date'),
  ...timestamp,
})
