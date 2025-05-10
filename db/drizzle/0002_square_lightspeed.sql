PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_journals` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`mood_id` text NOT NULL,
	`mood_level` text NOT NULL,
	`image_uri` text,
	`local_date` text DEFAULT (CURRENT_DATE) NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`mood_id`) REFERENCES `moods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_journals`("id", "content", "mood_id", "mood_level", "image_uri", "local_date", "created_at") SELECT "id", "content", "mood_id", "mood_level", "image_uri", "local_date", "created_at" FROM `journals`;--> statement-breakpoint
DROP TABLE `journals`;--> statement-breakpoint
ALTER TABLE `__new_journals` RENAME TO `journals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_moods` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_moods`("id", "name", "color", "created_at") SELECT "id", "name", "color", "created_at" FROM `moods`;--> statement-breakpoint
DROP TABLE `moods`;--> statement-breakpoint
ALTER TABLE `__new_moods` RENAME TO `moods`;