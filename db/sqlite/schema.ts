import { relations, sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const timestamp = {
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
}

export const journals = sqliteTable('journals', {
  id: int('id').primaryKey({ autoIncrement: true }),
  content: text('content'),
  moodId: int('mood_id')
    .references(() => moods.id)
    .notNull(),
  moodLevel: text('mood_level').notNull(),
  imageUri: text('image_uri'),
  localDate: text('local_date').default(sql`(CURRENT_DATE)`).notNull(),
  ...timestamp,
})

export const moods = sqliteTable('moods', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  color: text('color').notNull(),
  ...timestamp,
})

export const journalsRelations = relations(journals, ({ one }) => ({
  mood: one(moods, {
    fields: [journals.moodId],
    references: [moods.id],
  }),
}))

export const moodsRelations = relations(moods, ({ many }) => ({
  journals: many(journals),
}))
