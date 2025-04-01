import { sendReplyMail } from "../../../utils/mailer";

export async function POST(req) {
  console.log("API sending contact mail...");
  try {
    const { email, subject, message } = await req.json();
    /*  Send Mail */
    sendReplyMail({
      to: email,
      subject: subject,
      template: message,
    });
    return Response.json({
      success: true,
      status: 201,
      message: "Thanks for reaching out! We'll get back to you soon.",
      data: {},
    });
  } catch (error) {
    return Response.json(
      { error: "Error creating contact" || error },
      { status: 400 }
    );
  }
}
