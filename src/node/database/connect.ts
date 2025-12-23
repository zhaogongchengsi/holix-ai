import process from 'node:process'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { drizzle } from 'drizzle-orm/libsql/sqlite3'
import { app } from 'electron'
import { resolve } from 'path'
import { databaseUrl } from '../constant'

export const db = drizzle({
	connection: databaseUrl,
})

export async function migrateDb() {
	const dir = resolve(app.isPackaged ? process.resourcesPath : process.cwd(), 'drizzle')
	migrate(db, {
		migrationsFolder: dir,
	})
}