CREATE TABLE `stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`current_streak` integer DEFAULT 0,
	`max_streak` integer DEFAULT 0,
	`last_active_date` text
);
