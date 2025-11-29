PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question_id` integer NOT NULL,
	`content` text NOT NULL,
	`answered_by` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`is_helpful` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`answered_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_answers`("id", "question_id", "content", "answered_by", "created_at", "updated_at", "is_helpful") SELECT "id", "question_id", "content", "answered_by", "created_at", "updated_at", "is_helpful" FROM `answers`;--> statement-breakpoint
DROP TABLE `answers`;--> statement-breakpoint
ALTER TABLE `__new_answers` RENAME TO `answers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;