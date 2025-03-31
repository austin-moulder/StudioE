import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simply return the default logo path
    // This is a simplified implementation that doesn't rely on Firebase
    return NextResponse.json({ url: '/logo.svg' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Return default logo on error
    return NextResponse.json({ url: '/logo.svg' }, { status: 200 });
  }
} 