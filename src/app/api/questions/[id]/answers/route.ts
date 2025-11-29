import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { answers, questions, user } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    // Extract and validate question ID from params
    const questionId = params.id;
    if (!questionId || isNaN(parseInt(questionId))) {
      return NextResponse.json(
        { 
          error: 'Valid question ID is required',
          code: 'INVALID_QUESTION_ID' 
        },
        { status: 400 }
      );
    }

    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          code: 'AUTHENTICATION_REQUIRED' 
        },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Content is required and cannot be empty',
          code: 'MISSING_CONTENT' 
        },
        { status: 400 }
      );
    }

    // Verify question exists
    const existingQuestion = await db.select()
      .from(questions)
      .where(eq(questions.id, parseInt(questionId)))
      .limit(1);

    if (existingQuestion.length === 0) {
      return NextResponse.json(
        { 
          error: 'Question not found',
          code: 'QUESTION_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Create the answer
    const newAnswer = await db.insert(answers)
      .values({
        questionId: parseInt(questionId),
        content: content.trim(),
        answeredBy: session.user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isHelpful: false
      })
      .returning();

    if (newAnswer.length === 0) {
      throw new Error('Failed to create answer');
    }

    // Increment answer count on the question
    await db.update(questions)
      .set({ 
        answerCount: sql`${questions.answerCount} + 1` 
      })
      .where(eq(questions.id, parseInt(questionId)));

    // Query the created answer with user info
    const answerWithUser = await db.select({
      id: answers.id,
      questionId: answers.questionId,
      content: answers.content,
      answeredBy: answers.answeredBy,
      createdAt: answers.createdAt,
      updatedAt: answers.updatedAt,
      isHelpful: answers.isHelpful,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    })
      .from(answers)
      .leftJoin(user, eq(answers.answeredBy, user.id))
      .where(eq(answers.id, newAnswer[0].id))
      .limit(1);

    if (answerWithUser.length === 0) {
      throw new Error('Failed to retrieve created answer');
    }

    return NextResponse.json(answerWithUser[0], { status: 201 });

  } catch (error) {
    console.error('POST answer error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}