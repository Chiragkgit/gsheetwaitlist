import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Google Script URL is not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit email' },
      { status: 500 }
    );
  }
} 