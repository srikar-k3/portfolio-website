import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // For now, just log the submission (you can integrate with email service later)
    console.log('Contact form submission:', { name, email, message });

    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Nodemailer
    // - Resend
    // - EmailJS
    
    // Example with a simple email service integration:
    /*
    const emailData = {
      to: 'srikark@scarletmail.rutgers.edu',
      from: email,
      subject: `Portfolio Contact: ${name}`,
      text: message,
    };
    
    await emailService.send(emailData);
    */

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}