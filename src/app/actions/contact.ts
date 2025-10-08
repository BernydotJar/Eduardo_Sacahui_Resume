"use server";

import * as z from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type ContactFormState = {
  success: boolean;
  message?: string;
};

export async function sendContactMessage(
  values: z.infer<typeof contactSchema>
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid input data." };
  }

  const { name, email, message } = parsed.data;

  // IMPORTANT: Replace with your actual email transport configuration
  // For example, using an SMTP service like SendGrid, Mailgun, or AWS SES.
  // Using ethereal.email for testing purposes.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your SMTP username
      pass: process.env.SMTP_PASS, // Your SMTP password
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: "eduardo.sacahui@gmail.com",
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    // In a real app, you would uncomment the following line.
    // For this demo, we'll simulate a successful response.
    // await transporter.sendMail(mailOptions);
    console.log("Simulating email sending with Nodemailer:", mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send message." };
  }
}
