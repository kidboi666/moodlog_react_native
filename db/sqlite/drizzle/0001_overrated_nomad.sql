ALTER TABLE `journals` ADD `ai_response_enabled` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `journals` ADD `ai_response` text;--> statement-breakpoint
ALTER TABLE `journals` ADD `ai_response_at` text;