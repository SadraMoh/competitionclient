import { QuestionOption } from "./QuestionOption";

export interface Question {
  /** id for the question */
  questionId: number;
  questionText: string;
  /** round time in seconds */
  responseLifeTime: number;
  questionOptions: QuestionOption[];
}