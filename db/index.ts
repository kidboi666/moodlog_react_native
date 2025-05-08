import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as SQLite from 'expo-sqlite'
import * as schema from './schema'

export const expo = SQLite.openDatabaseSync('moodlog.db')
export const db = drizzle(expo, { schema, casing: 'snake_case' })
