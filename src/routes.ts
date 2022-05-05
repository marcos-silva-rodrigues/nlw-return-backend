import { Router } from "express";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adpater";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-cases.";

const route = Router();

route.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});

export { route };
