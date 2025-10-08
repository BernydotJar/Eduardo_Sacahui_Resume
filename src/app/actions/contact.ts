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

  // This part is for simulating email sending without real credentials.
  // In a real application, you would configure nodemailer with a service like SendGrid or AWS SES.
  console.log("Simulating email sending...");
  console.log(`To: eduardo.sacahui@gmail.com`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Subject: New message from ${name}`);
  console.log(`Message: ${message}`);

  // We will return a success response to demonstrate the form functionality.
  return { success: true };
}
