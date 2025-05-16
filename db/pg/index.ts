import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DIRECT_URL!

// Disable prefetch as it is not supported for "Transaction" pool mode
export const postgresClient = postgres(connectionString, { prepare: false })
export const postgresDb = drizzle(postgresClient, { schema, logger: true })
