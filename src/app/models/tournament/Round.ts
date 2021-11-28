import { Id } from "../Id";
import { QuestionOption } from "./QuestionOption";

export interface Round extends Id {
  questionTexT:number;
  questionText: string;
  questionOptions: QuestionOption[];
}