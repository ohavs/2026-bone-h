import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, project, message } = body as {
      name?: string;
      phone?: string;
      email?: string;
      project?: string;
      message?: string;
    };

    if (!name || !email) {
      return NextResponse.json({ error: "שדות חובה חסרים" }, { status: 400 });
    }

    // Always persist the submission
    await addSubmission({ name, phone: phone ?? "", email, project: project ?? "", message: message ?? "" });

    // If env vars are not configured, skip email (dev mode)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn("[contact] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping email");
      return NextResponse.json({ ok: true });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const recipient = process.env.CONTACT_EMAIL ?? process.env.GMAIL_USER;

    await transporter.sendMail({
      from: `"אתר בונה הירדן המערבי" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `פנייה חדשה מהאתר — ${name}`,
      text: [
        `שם: ${name}`,
        `טלפון: ${phone || "—"}`,
        `מייל: ${email}`,
        `פרויקט / עניין: ${project || "—"}`,
        "",
        `הודעה:`,
        message || "—",
      ].join("\n"),
      html: `
        <div dir="rtl" style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#F7F5EE;border-radius:12px;border:1px solid rgba(31,59,56,0.12)">
          <h2 style="color:#1F3B38;font-size:20px;margin-bottom:24px;font-weight:400">
            פנייה חדשה מהאתר
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid rgba(31,59,56,0.1)">
              <td style="padding:10px 0;color:#6F7E7C;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:30%">שם</td>
              <td style="padding:10px 0;color:#1F3B38;font-size:15px">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(31,59,56,0.1)">
              <td style="padding:10px 0;color:#6F7E7C;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">טלפון</td>
              <td style="padding:10px 0;color:#1F3B38;font-size:15px">${phone || "—"}</td>
            </tr>
            <tr style="border-bottom:1px solid rgba(31,59,56,0.1)">
              <td style="padding:10px 0;color:#6F7E7C;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">מייל</td>
              <td style="padding:10px 0"><a href="mailto:${email}" style="color:#3D6F6A">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid rgba(31,59,56,0.1)">
              <td style="padding:10px 0;color:#6F7E7C;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">פרויקט</td>
              <td style="padding:10px 0;color:#1F3B38;font-size:15px">${project || "—"}</td>
            </tr>
          </table>
          ${
            message
              ? `<div style="margin-top:24px;padding:16px;background:rgba(61,111,106,0.06);border-radius:8px;border-right:3px solid #3D6F6A">
                  <p style="margin:0;color:#6F7E7C;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">הודעה</p>
                  <p style="margin:0;color:#1F3B38;font-size:15px;line-height:1.7">${message.replace(/\n/g, "<br>")}</p>
                </div>`
              : ""
          }
          <p style="margin-top:32px;color:#6F7E7C;font-size:11px;text-align:center">
            נשלח מאתר bone-h.co.il
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Email send failed:", err);
    return NextResponse.json({ error: "שגיאה בשליחת המייל" }, { status: 500 });
  }
}
