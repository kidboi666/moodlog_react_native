CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"age" text,
	"email" text,
	"provider" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"current_streak" integer DEFAULT 0,
	"max_streak" integer DEFAULT 0,
	"last_active_date" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
