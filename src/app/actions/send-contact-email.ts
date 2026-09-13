'use server';

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface SendContactEmailResult {
  ok: boolean;
  error?: string;
}

// TODO: real email delivery isn't wired up yet. Provisioning Resend via the
// Vercel Marketplace requires a domain you own (DNS verification) and a paid
// plan — see .env.example for the exact command once that's ready. Until
// then, submissions are logged server-side and the caller is told to reach
// out directly instead of a false "sent" confirmation.
export async function sendContactEmail(
  submission: ContactSubmission
): Promise<SendContactEmailResult> {
  const { name, email, message } = submission;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, error: 'Please fill in every field.' };
  }

  const receiver = process.env.CONTACT_RECEIVER_EMAIL ?? 'otellandanusa@gmail.com';

  if (!process.env.RESEND_API_KEY) {
    console.log('[contact form] Email sending not configured. Submission:', {
      name,
      email,
      message,
      intendedReceiver: receiver,
    });
    return {
      ok: false,
      error: `Email sending isn't wired up yet — please reach out directly at ${receiver}.`,
    };
  }

  // Once RESEND_API_KEY is provisioned, send via Resend's API here.
  return { ok: false, error: `Email sending isn't wired up yet — please reach out directly at ${receiver}.` };
}
