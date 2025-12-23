import { defineConfig } from 'drizzle-kit'
import { existsSync } from 'node:fs'
import fse from 'fs-extra'

const userDataDir = fse.existsSync('.holixai') ? '.holixai' : './.holixai'

if (!existsSync(userDataDir)) {
	fse.mkdirSync(userDataDir, { recursive: true })
}

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/node/database/schema',
	dbCredentials: {
		url: './.holixai/sqlite.db', // 这里是关键，指定 SQLite 数据库文件路径
	},
})