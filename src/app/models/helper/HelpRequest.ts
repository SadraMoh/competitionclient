export interface HelpRequest {
  heleprEnumId: number;
  questionId: number;
  userId?: number;
  /** [Receive Only] */
  deleteFalseOptionId?: number;
}