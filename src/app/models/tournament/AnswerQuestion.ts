import { Id } from "../Id";

export interface AnswerQuestion extends Id {
  questionId: number;
  optionId?: number;
  responsesTime: number;
  isHelp: boolean;
  helperEnumId?: number;
  userId: number;
}