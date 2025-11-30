'use server'

import { db } from "@/db";
import { questions, answers, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createQuestion(data: { title: string, content: string, category: string, isAnonymous: boolean }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const [newQuestion] = await db.insert(questions).values({
        title: data.title,
        content: data.content,
        category: data.category,
        isAnonymous: data.isAnonymous,
        askedBy: session.user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }).returning();

    revalidatePath('/campusQueryConnect');
    return newQuestion;
}

export async function getQuestions() {
    const allQuestions = await db.select({
        id: questions.id,
        title: questions.title,
        content: questions.content,
        category: questions.category,
        isAnonymous: questions.isAnonymous,
        createdAt: questions.createdAt,
        viewCount: questions.viewCount,
        answerCount: questions.answerCount,
        askedBy: questions.askedBy,
        authorName: user.name,
        authorAvatar: user.image,
    })
        .from(questions)
        .leftJoin(user, eq(questions.askedBy, user.id))
        .orderBy(desc(questions.createdAt));

    // Transform to match the frontend Question interface
    return allQuestions.map(q => ({
        id: q.id.toString(),
        userId: q.askedBy || 'unknown',
        title: q.title,
        content: q.content,
        category: q.category,
        timestamp: new Date(q.createdAt).toLocaleDateString(), // Format as needed
        isUnanswered: q.answerCount === 0,
        important: false, // You might want to add this to DB schema later
        answers: [], // You'd need to fetch answers separately or join them
        views: q.viewCount,
        isAnonymous: q.isAnonymous,
        author: {
            name: q.isAnonymous ? "Anonymous User" : (q.authorName || "Unknown User"),
            avatar: q.isAnonymous ? "" : (q.authorAvatar || ""),
            id: q.askedBy || 'unknown',
        }
    }));
}
