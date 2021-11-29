import { Id } from "../Id";

export interface Coinbox extends Id {

  /** how much coin the user has left, after purchace */
  coinCount: number;
  /** the price of the purchace */
  price: number;

}