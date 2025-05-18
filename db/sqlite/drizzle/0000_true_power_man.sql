CREATE TABLE `journals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text,
	`mood_id` integer NOT NULL,
	`mood_level` text NOT NULL,
	`image_uri` text,
	`local_date` text DEFAULT (CURRENT_DATE),
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`mood_id`) REFERENCES `moods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `moods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`current_streak` integer DEFAULT 0,
	`max_streak` integer DEFAULT 0,
	`last_active_date` text
);
