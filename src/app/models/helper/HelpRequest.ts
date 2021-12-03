export interface HelpRequest {
  helperEnumId: number;
  questionId: number;
  userId?: number;
  /** [Receive Only] */
  deleteFalseOptionId?: number;
}