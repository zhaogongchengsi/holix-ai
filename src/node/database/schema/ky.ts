import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const users = table(
	"ky",
	{
		id: t.int().primaryKey({ autoIncrement: true }),
		key: t.text("key"),
		value: t.text("value"),
	},
	(table) => [
		t.uniqueIndex("key_idx").on(table.key)
	]
);

