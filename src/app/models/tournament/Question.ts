import { QuestionOption } from "./QuestionOption";

export interface Question {
  questionId: number;
  questionText: string;
  responseLifeTime: number;
  questionOptions: QuestionOption[];
}