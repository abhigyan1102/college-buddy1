import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { questions, user } from '@/db/schema';
import { eq, desc, like, or, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, isAnonymous } = body;

    // Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    // Get session (optional for questions)
    const session = await auth.api.getSession({ headers: request.headers });
    
    // Determine askedBy based on authentication and isAnonymous flag
    let askedByValue = null;
    if (session?.user && !isAnonymous) {
      askedByValue = session.user.id;
    }

    const now = new Date().toISOString();

    // Insert question
    const newQuestion = await db.insert(questions)
      .values({
        title: title.trim(),
        content: content.trim(),
        askedBy: askedByValue,
        isAnonymous: isAnonymous === true,
        createdAt: now,
        updatedAt: now,
        viewCount: 0,
        answerCount: 0,
      })
      .returning();

    // Fetch the created question with user info
    const questionWithUser = await db.select({
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
      }
    })
      .from(questions)
      .leftJoin(user, eq(questions.askedBy, user.id))
      .where(eq(questions.id, newQuestion[0].id))
      .limit(1);

    const result = questionWithUser[0];
    
    // If anonymous, remove user info from response
    if (result.isAnonymous) {
      const { user: _, ...questionData } = result;
      return NextResponse.json(questionData, { status: 201 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10')));
    const offset = (page - 1) * limit;
    
    // Parse sort parameter
    const sort = searchParams.get('sort') ?? 'newest';
    const search = searchParams.get('search');

    // Build base query
    let query = db.select({
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
      }
    })
      .from(questions)
      .leftJoin(user, eq(questions.askedBy, user.id));

    // Apply search filter if provided
    if (search && search.trim().length > 0) {
      const searchTerm = `%${search.trim()}%`;
      query = query.where(
        or(
          like(questions.title, searchTerm),
          like(questions.content, searchTerm)
        )
      ) as typeof query;
    }

    // Apply sorting
    if (sort === 'popular') {
      query = query.orderBy(desc(questions.viewCount), desc(questions.answerCount)) as typeof query;
    } else {
      // Default to "newest"
      query = query.orderBy(desc(questions.createdAt)) as typeof query;
    }

    // Apply pagination
    query = query.limit(limit).offset(offset) as typeof query;

    // Execute query
    const results = await query;

    // Get total count for pagination
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(questions);
    
    if (search && search.trim().length > 0) {
      const searchTerm = `%${search.trim()}%`;
      countQuery = countQuery.where(
        or(
          like(questions.title, searchTerm),
          like(questions.content, searchTerm)
        )
      ) as typeof countQuery;
    }

    const totalCount = await countQuery;
    const total = totalCount[0]?.count ?? 0;

    // Format results - remove user info for anonymous questions
    const formattedQuestions = results.map(q => {
      if (q.isAnonymous) {
        const { user: _, ...questionData } = q;
        return questionData;
      }
      return q;
    });

    return NextResponse.json({
      questions: formattedQuestions,
      pagination: {
        page,
        limit,
        total,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}