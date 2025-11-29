CREATE TABLE `answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_id` integer NOT NULL,
	`content` text NOT NULL,
	`answered_by` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`is_helpful` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`answered_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`asked_by` text,
	`is_anonymous` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`view_count` integer DEFAULT 0 NOT NULL,
	`answer_count` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`asked_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
