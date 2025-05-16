CREATE TABLE `journals` (
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
CREATE TABLE `moods` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
