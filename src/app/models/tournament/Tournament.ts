import { Round } from "./Round";

export interface Tournament {
  title: string;
  isMultiPlayer: boolean;
  imageUrl: string;
  rounds?: Round[];
  fee: number;
}