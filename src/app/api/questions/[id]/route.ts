import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { questions, answers, user } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;

    // Validate ID is valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Query question with user info (LEFT JOIN)
    const questionResult = await db
      .select({
        id: questions.id,
        title: questions.title,
        content: questions.content,
        askedBy: questions.askedBy,
        isAnonymous: questions.isAnonymous,
        createdAt: questions.createdAt,
        updatedAt: questions.updatedAt,
        viewCount: questions.viewCount,
        answerCount: questions.answerCount,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(questions)
      .leftJoin(user, eq(questions.askedBy, user.id))
      .where(eq(questions.id, parseInt(id)))
      .limit(1);

    if (questionResult.length === 0) {
      return NextResponse.json(
        { 
          error: 'Question not found',
          code: 'QUESTION_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    const question = questionResult[0];

    // Query all answers for this question with user info (LEFT JOIN)
    const answersResult = await db
      .select({
        id: answers.id,
        content: answers.content,
        answeredBy: answers.answeredBy,
        createdAt: answers.createdAt,
        updatedAt: answers.updatedAt,
        isHelpful: answers.isHelpful,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(answers)
      .leftJoin(user, eq(answers.answeredBy, user.id))
      .where(eq(answers.questionId, parseInt(id)))
      .orderBy(desc(answers.createdAt));

    // Format response
    const response = {
      question: {
        id: question.id,
        title: question.title,
        content: question.content,
        askedBy: question.askedBy,
        isAnonymous: question.isAnonymous,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        viewCount: question.viewCount,
        answerCount: question.answerCount,
        user: question.isAnonymous ? null : question.user,
      },
      answers: answersResult.map(answer => ({
        id: answer.id,
        content: answer.content,
        answeredBy: answer.answeredBy,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        isHelpful: answer.isHelpful,
        user: answer.user,
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;

    // Validate ID is valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { viewCount } = body;

    // Validate viewCount
    if (viewCount === undefined || viewCount === null || typeof viewCount !== 'number') {
      return NextResponse.json(
        { 
          error: 'Valid viewCount is required',
          code: 'INVALID_VIEW_COUNT' 
        },
        { status: 400 }
      );
    }

    if (viewCount < 0) {
      return NextResponse.json(
        { 
          error: 'viewCount must be a non-negative number',
          code: 'INVALID_VIEW_COUNT' 
        },
        { status: 400 }
      );
    }

    // Check if question exists
    const existingQuestion = await db
      .select()
      .from(questions)
      .where(eq(questions.id, parseInt(id)))
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

    // Update question with new viewCount and updatedAt
    const updated = await db
      .update(questions)
      .set({
        viewCount: viewCount,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(questions.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}