import { relations } from 'drizzle-orm'
import * as t from 'drizzle-orm/sqlite-core'
import { sqliteTable as table } from 'drizzle-orm/sqlite-core'
import * as Crypto from 'expo-crypto'

const createdAt = t
  .integer('created_at', { mode: 'timestamp_ms' })
  .$default(() => new Date())
  .notNull()

export const journals = table('journals', {
  id: t
    .text('id')
    .primaryKey()
    .$defaultFn(() => Crypto.randomUUID()),
  content: t.text('content'),
  moodId: t
    .text('mood_id')
    .references(() => moods.id)
    .notNull(),
  moodLevel: t.text('mood_level').notNull(),
  imageUri: t.text('image_uri'),
  localDate: t.text('local_date').notNull(),
  createdAt,
})

export const moods = table('moods', {
  id: t
    .text('id')
    .primaryKey()
    .$defaultFn(() => Crypto.randomUUID()),
  name: t.text('name').notNull(),
  color: t.text('color').notNull(),
  createdAt,
})

export const journalsRelations = relations(journals, ({ one }) => ({
  moods: one(moods, {
    fields: [journals.moodId],
    references: [moods.id],
  }),
}))

export const moodsRelations = relations(moods, ({ many }) => ({
  journals: many(journals),
}))
