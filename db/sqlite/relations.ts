import { relations } from 'drizzle-orm'
import { journals, moods } from './schema'

export const journalsRelations = relations(journals, ({ one }) => ({
  mood: one(moods, {
    fields: [journals.moodId],
    references: [moods.id],
  }),
}))

export const moodsRelations = relations(moods, ({ many }) => ({
  journals: many(journals),
}))
