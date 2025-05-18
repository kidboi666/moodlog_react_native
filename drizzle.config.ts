import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './db/sqlite/schema.ts',
  out: './db/sqlite/drizzle',
})
