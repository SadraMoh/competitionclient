import { Participant } from "./Participant.";
import { Round } from "./Round";
import { TournamentDifficulty } from "./TournamentDifficulty";

export interface TournamentInfo {

  title: string;
  /** is actual or test */
  isMultiPlayer: boolean;
  imageUrl: string;
  roundsCount?: number;
  /** retake fee */
  fee: number;
  /** has the current user attended this tournament before */
  hasAttended?: boolean;
  difficulty: TournamentDifficulty;

  participants: Participant[];
}