import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { Client, createClient } from '@libsql/client'
import * as schema from './schema'

const client: Client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema })
