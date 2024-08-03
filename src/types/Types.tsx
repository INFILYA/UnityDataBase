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
  previousTeam: string;
  team: string;
  position: "OH" | "Opp" | "Set" | "Lib" | "MB" | "Coach" | "";
  birthday: string;
  height: string;
  number: string;
  telephone: string;
  photo: string;
  reach: string;
  hand: "left" | "right" | "ambidextrous" | "";
  highlights: boolean;
  highlightsLink?: string[];
  evaluation: TEval;
};

export type TEval = { [key: string]: boolean };
