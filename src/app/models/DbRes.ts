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

export function isDbResValid(dbRes: DbRes<any>) {

  return !dbRes.isCanceled && dbRes.isCompleted && !dbRes.isFaulted;

}