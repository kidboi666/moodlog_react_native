import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { authUsers } from 'drizzle-orm/supabase'

export const userProfiles = pgTable('user_profiles', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid('user_id').references(() => authUsers.id, {
    onDelete: 'cascade',
  }),
  userName: text('user_name'),
  age: text(),
  email: text(),
  provider: text(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { mode: 'string' }),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})

export const userStats = pgTable('user_stats', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  currentStreak: integer('current_streak').default(0),
  maxStreak: integer('max_streak').default(0),
  lastActiveDate: text('last_active_date'),
  createdAt: timestamp('created_at', { mode: 'string' }),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})
