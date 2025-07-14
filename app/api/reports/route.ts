import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const pendingReports = await sql`
      SELECT * FROM reports WHERE status = 'pending'
    `;
    const approvedReports = await sql`
      SELECT * FROM reports WHERE status = 'approved'
    `;
    const rejectedReports = await sql`
      SELECT * FROM reports WHERE status = 'rejected'
    `;
    
    return NextResponse.json({
      pendingReports,
      approvedReports,
      rejectedReports
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authorId, authorName, scammerName, scammerId, description, images, status = 'pending' } = body;

    const result = await sql`
      INSERT INTO reports (
        author_id,
        author_name,
        scammer_name,
        scammer_id,
        description,
        images,
        status
      ) VALUES (
        ${authorId},
        ${authorName},
        ${scammerName},
        ${scammerId},
        ${description},
        ${images},
        ${status}
      ) RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, risk } = body;

    const result = await sql`
      UPDATE reports
      SET status = ${status}${risk ? sql`, risk = ${risk}` : sql``}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}