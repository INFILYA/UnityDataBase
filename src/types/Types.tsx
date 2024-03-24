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
  position: "OH" | "Opp" | "Set" | "Lib" | "MB" | "Coach" | "Parent" | "";
  birthday: string;
  height: string;
  weight: string;
  number: string;
  telephone: string;
  photo: string;
  reach: string;
  hand: "left" | "right" | "ambidextrous" | "";
  highlights: boolean;
  highlightsLink?: string;
};
