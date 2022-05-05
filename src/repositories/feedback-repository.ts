export interface IFeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface IFeedbackRepository {
  create: (data: IFeedbackCreateData) => Promise<void>
}