import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user_stats = pgTable("user_stats", {
	id: serial().primaryKey().notNull(),
	current_streak: integer().default(0),
	max_streak: integer().default(0),
	last_active_date: text(),
	created_at: timestamp({ mode: 'string' }),
	updated_at: timestamp({ mode: 'string' }),
});

export const user_profiles = pgTable("user_profiles", {
	id: serial().primaryKey().notNull(),
	user_name: text().notNull(),
	age: text(),
	email: text(),
	created_at: timestamp({ mode: 'string' }),
	updated_at: timestamp({ mode: 'string' }),
	provider: text(),
});
