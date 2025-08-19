import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Verified sender email
    const senderEmail = "contact@jobairalsarkar.site";

    // HTML email template
    const html = `
      <div style="font-family: 'Inter', sans-serif; background-color:#E4EDD9; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">
          <div style="background: linear-gradient(90deg, #FFA500, #FF7B00); padding:20px; text-align:center; color:white; font-size:24px; font-weight:bold;">
            New Contact Form Submission
          </div>
          <div style="padding:20px; color:#14532D;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background:#E4EDD9; padding:12px; border-radius:8px; color:#14532D;">${message}</p>
          </div>
          <div style="padding:15px; text-align:center; font-size:12px; color:#659E0F; background:#F0F9E8;">
            Sent via jobairalsarkar.site
          </div>
        </div>
      </div>
    `;

    // Send email using Resend API via Axios
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: `DataForge <${senderEmail}>`,
        to: "jobairalsarkar338@gmail.com",
        subject: `Contact Form: ${subject}`,
        html: html,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : (axios.isAxiosError(error) ? JSON.stringify(error.response?.data) : "Failed to send email.");
    console.error("Contact API error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
