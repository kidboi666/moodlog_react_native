import { relations, sql } from 'drizzle-orm'
import { sqliteTable as table, text } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'

const createdAt = text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull()

export const journals = table('journals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  content: text('content'),
  moodId: text('mood_id')
    .references(() => moods.id)
    .notNull(),
  moodLevel: text('mood_level').notNull(),
  imageUri: text('image_uri'),
  localDate: text('local_date').default(sql`(CURRENT_DATE)`).notNull(),
  createdAt,
})

export const moods = table('moods', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text('name').notNull(),
  color: text('color').notNull(),
  createdAt,
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
