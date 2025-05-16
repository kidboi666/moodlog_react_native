import { relations } from 'drizzle-orm/relations'
import { authUsers } from 'drizzle-orm/supabase'
import { userProfiles, userStats } from './schema'

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  userInfo: one(authUsers, {
    fields: [userProfiles.userId],
    references: [authUsers.id],
  }),
}))

export const userStatsRelations = relations(userStats, ({ one }) => ({
  userInfo: one(authUsers, {
    fields: [userStats.userId],
    references: [authUsers.id],
  }),
}))
