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
    
    // Send to webhook
    const webhookUrl = 'https://nocoded-n8n-u41031.vm.elestio.app/webhook/fbf64cb4-aa0b-4830-b5d8-c113ed92f1d0';
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formName: 'waitlist',
        formType: 'waitlist',
        ...validatedData,
        timestamp: new Date().toISOString(),
      }),
    });
    
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
