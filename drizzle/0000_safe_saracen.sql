CREATE TABLE `ky` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text,
	`value` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `key_idx` ON `ky` (`key`);