import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

export class NodeMailerMailAdapter implements MailAdapter {
  private emailService: Mail | null = null;

  constructor() {
    this.emailService = nodemailer.createTransport({
      host: String(process.env.EMAIL_HOST!),
      port: Number(process.env.EMAIL_PORT!),
      auth: {
        user: String(process.env.EMAIL_USER!),
        pass: String(process.env.EMAIL_PASS!),
      },
    });
  }
  async sendEmail({ body, subject }: SendMailData) {
    await this.emailService?.sendMail({
      from: "Marcos <marcos.rodrigues.dev@gmail.com>",
      to: "Kaue <kauetoll3@gmail.com>",
      html: body,
      subject,
    });
  }
}
