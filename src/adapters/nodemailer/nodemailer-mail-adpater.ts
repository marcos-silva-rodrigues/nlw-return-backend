import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT!),
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendEmail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Marcos <marcos.rodrigues.dev@gmail.com>",
      to: "Kaue <kauetoll3@gmail.com>",
      html: body,
      subject,
    });
  }
}
