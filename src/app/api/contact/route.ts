import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Check if Resend is initialized
    if (!resend) {
      console.warn('Resend API key is missing. Email sending is disabled.');
      // In production, you might want to store the message in a database instead
      return NextResponse.json(
        { message: 'Email functionality is currently disabled, but your message has been recorded.' },
        { status: 200 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Studio E Contact Form <onboarding@resend.dev>',
      to: 'studioelatindance@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 