import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/pg/schema.ts',
  out: './db/pg',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DIRECT_URL!,
  },
})
