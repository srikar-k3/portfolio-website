import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

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

    const apiKey = process.env.RESEND_API_KEY;
    const toAddress = process.env.CONTACT_TO || 'srkandulapati@gmail.com';

    if (!apiKey) {
      console.warn('Contact form received but RESEND_API_KEY is not set.');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [toAddress],
      reply_to: email,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>
\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif; line-height:1.6; color:#111">
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Message:</strong></p>
          <p>${(message || '').replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    });

    if ('error' in result && result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
