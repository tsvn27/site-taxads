import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST() {
  try {
    await sql`TRUNCATE TABLE reports;`;
    
    return NextResponse.json({ message: 'Todos os dados foram limpos com sucesso.' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}