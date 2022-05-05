import { SubmitFeedbackUseCase } from "./submit-feedback-use-cases.";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCases = new SubmitFeedbackUseCase(
  {
    create: createFeedbackSpy,
  },
  {
    sendEmail: sendMailSpy,
  }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    
    await expect(submitFeedbackUseCases.execute({
      type: "BUG",
      comment: "Novo Bug",
      screenshot: "data:image/png;base64 asfasfg2345sfgwqaer5"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it("should not able to submit feedback without type", async () => {
    await expect(submitFeedbackUseCases.execute({
      type: "",
      comment: "Novo Bug",
      screenshot: "data:image/png;base64 asfasfg2345sfgwqaer5"
    })).rejects.toThrow();
  });

  it("should not able to submit feedback without comment", async () => {
    await expect(submitFeedbackUseCases.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64 asfasfg2345sfgwqaer5"
    })).rejects.toThrow();
  });

  it("should not able to submit feedback with an invalid screenshot", async () => {
    await expect(submitFeedbackUseCases.execute({
      type: "BUG",
      comment: "bla bla bla",
      screenshot: "test.jpg"
    })).rejects.toThrow();
  });
});
