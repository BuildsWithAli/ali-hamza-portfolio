import nodemailer from "nodemailer";

export function isEmailConfigured() {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD);
}

/**
 * Sends a plain-text notification for a new contact-form message.
 * Uses Gmail SMTP with an App Password by default (see README.md), but
 * any SMTP provider works if you swap the transport config below.
 * No-ops (returns {sent:false}) when email isn't configured yet, so the
 * contact form can still store messages in Supabase before you set this up.
 */
export async function sendContactNotification({ name, email, message }) {
  if (!isEmailConfigured()) return { sent: false, reason: "not_configured" };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `${message}\n\n---\nFrom: ${name} <${email}>`,
    html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p><hr><p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
  });

  return { sent: true };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
