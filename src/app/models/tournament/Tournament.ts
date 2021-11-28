import { Id } from "../Id";
import { Round } from "./Round";

export interface Tournament extends Id {
  title: string;
  isMultiPlayer: boolean;
  imageUrl: string;
  rounds?: Round[];
  fee: number;
}