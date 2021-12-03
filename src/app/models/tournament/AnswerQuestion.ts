import { Id } from "../Id";

export interface AnswerQuestion {
  roundId: number;
  questionId: number;
  /** the chosen option */
  optionId?: number;
  responsesTime: number;
  isHelp: boolean;
  helperEnumId?: number;
  userId?: number;
  /** the correct answer */
  correctOptionId?: number;
}