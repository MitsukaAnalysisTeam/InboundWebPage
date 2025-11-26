import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Cookie削除
  response.cookies.delete('admin_token');
  
  return response;
}
