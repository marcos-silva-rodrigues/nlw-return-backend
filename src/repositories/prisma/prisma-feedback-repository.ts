import { prisma } from "../../prisma";
import {
  IFeedbackCreateData,
  IFeedbackRepository,
} from "../feedback-repository";

export class PrismaFeedbackRepository implements IFeedbackRepository {
  async create({ type, comment, screenshot }: IFeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
