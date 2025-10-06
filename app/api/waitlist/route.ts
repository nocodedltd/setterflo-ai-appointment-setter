import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(1, 'Instagram username is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = waitlistSchema.parse(body);
    
    // TODO: Add to your database or email service
    // For now, we'll just send to webhook
    const webhookUrl = process.env.WEBHOOK_URL;
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'waitlist',
          ...validatedData,
          timestamp: new Date().toISOString(),
        }),
      });
    }
    
    return NextResponse.json(
      { success: true, message: 'Successfully joined waitlist' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
