import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ensure Node runtime (not Edge)

function missing(...keys: string[]) {
  const miss = keys.filter(k => !process.env[k]);
  return miss.length ? `Missing env: ${miss.join(", ")}` : null;
}

// Quick health check: GET /api/contact
export async function GET() {
  const err = missing("SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS");
  return NextResponse.json({
    ok: !err,
    env: {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER ? "set" : "missing",
      CONTACT_TO: process.env.CONTACT_TO || "(default to SMTP_USER)"
    },
    note: err ?? "envs look OK",
  }, { status: err ? 500 : 200 });
}

export async function POST(req: Request) {
  try {
    const err = missing("SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS");
    if (err) return NextResponse.json({ ok: false, error: err }, { status: 500 });

    const { name, email, purpose, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // First attempt: 465/secure
    const primary = nodemailer.createTransport({
      host: process.env.SMTP_HOST,             // smtp.gmail.com
      port: Number(process.env.SMTP_PORT),     // 465
      secure: process.env.SMTP_SECURE === "true", // true for 465
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      logger: true,
      debug: true,
      connectionTimeout: 20_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
      tls: { servername: process.env.SMTP_HOST },
    });

    const mail = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER!,
      replyTo: email,
      subject: `Portfolio Contact — ${purpose || "General"}`,
      text: `Name: ${name}\nEmail: ${email}\nPurpose: ${purpose || ""}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Purpose:</strong> ${purpose || ""}</p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    };

    try {
      await primary.sendMail(mail);
    } catch (e1) {
      console.warn("SMTP 465 failed, retrying 587 STARTTLS…", e1);
      // Fallback: 587 STARTTLS (some networks block 465)
      const fallback = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
        requireTLS: true,
        logger: true,
        debug: true,
        connectionTimeout: 20_000,
        greetingTimeout: 15_000,
        socketTimeout: 30_000,
        tls: { servername: process.env.SMTP_HOST },
      });
      await fallback.sendMail(mail);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Mail error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to send" },
      { status: 500 }
    );
  }
}