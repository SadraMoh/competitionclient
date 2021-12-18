import { Id } from "../Id";
import { Participant } from "./Participant.";
import { Round } from "./Round";
import { TournamentDifficulty } from "./TournamentDifficulty";

export interface TournamentInfo extends Id {

  title: string;
  /** is actual or test */
  isMultiPlayer: boolean;
  imageUrl: string;
  /** retake fee */
  fee: number;
  /** has the current user attended this tournament before */
  hasAttended?: boolean;
  difficulty: TournamentDifficulty;
  questionCount?: number;
  roundsCount?: number;
  /** 8.07:34:17.0794045 ${days}.${hours}:${minutes}:${seconds} */
  deadline: string;
  participants?: Participant[];
  rounds?: Round[];
}