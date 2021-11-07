import { Res } from "./Res";

export interface DbRes<Value> {
  result: Res<Value>;
  id: number;
  exception?: any;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  asyncState?: any;
  isFaulted: boolean;
}