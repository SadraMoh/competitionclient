export interface Res<Value> {
  isSuccess: boolean;
  message: string;
  value: Value;
}