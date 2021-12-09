import { Id } from "../Id";
import { Round } from "./Round";
import { TournamentDifficulty } from "./TournamentDifficulty";

export interface Tournament extends Id {
  title: string;
  difficulty: TournamentDifficulty;
  /** is actual or test */
  isMultiPlayer: boolean;
  imageUrl: string;
  rounds?: Round[];
  roundsCount?: number;
  /** retake fee */
  fee: number;
  /** has the current user attended this tournament before */
  hasAttended?: boolean;
  /** 8.07:34:17.0794045 ${days}.${hours}:${minutes}:${seconds} */
  deadline?: string;
  participantsCount: number;
}