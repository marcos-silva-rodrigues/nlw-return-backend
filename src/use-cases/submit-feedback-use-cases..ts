import { MailAdapter } from "../adapters/mail-adapter";
import { IFeedbackRepository } from "../repositories/feedback-repository";

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is Required");
    }

    if (!comment) {
      throw new Error("Comment is Required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendEmail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: san-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}<p/>`,
        `<p>Comentario: ${comment}<p/>`,
        screenshot ? `<img src="${screenshot}"` : "",
        `<div />`,
      ].join("\n"),
    });
  }
}
