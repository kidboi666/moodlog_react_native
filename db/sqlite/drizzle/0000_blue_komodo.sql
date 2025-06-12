CREATE TABLE `journals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text,
	`mood_level` text NOT NULL,
	`image_uri` text,
	`local_date` text DEFAULT (date('now', 'localtime')),
	`ai_response_enabled` integer DEFAULT false,
	`ai_response` text,
	`ai_response_at` text,
	`created_at` text DEFAULT (datetime('now', 'localtime' )) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`current_streak` integer DEFAULT 0,
	`max_streak` integer DEFAULT 0,
	`last_active_date` text,
	`created_at` text DEFAULT (datetime('now', 'localtime' )) NOT NULL
);
