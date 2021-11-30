import { Id } from "../Id";

export interface QuestionOption extends Id {
  optionText: string;
  isTrue:boolean;
}