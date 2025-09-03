import { CSSProperties, FormEvent } from "react";

export type ISectionW = {
  background?: React.ReactNode;
  children: React.ReactNode;
};
export type IFormW = {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
export type TBUttonProps = {
  text: string | React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
};

export type TUserInfo = {
  firstName: string;
  lastName: string;
  email: string | null | undefined;
  gender: string;
  team: string;
  position: "OH" | "OPP" | "SET" | "LIB" | "MB" | "COACH" | "";
  birthday: string;
  height: string;
  number: string;
  telephone: string;
  photo: string;
  standingVerticalJump: string;
  approachingVerticalJump: string;
  twentyMeterSprint: string;
  fourOnNineRun: string;
  pushUpsFromKnees: string;
  pullUpsOnLowBar: string;
  overheadMedicineBallThrow: string;
  plank: string;
  apleyScratch: string;
  kneeToWall: string;
  sitAndReach: string;
  shoulderFlexion: string;
  seatedTrunk: string;
  butterfly: string;
  highlights: boolean;
  highlightsLink?: string[];
  evaluation: TEval;
};

export type TEval = { [key: string]: boolean };
