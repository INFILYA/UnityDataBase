import { useAuthState } from "react-firebase-hooks/auth";
import { TUserInfo } from "../types/Types";
import SendForm from "./components/SendForm";
import { auth } from "../config/firebase";
import Table from "./components/Table";
import { useSelector } from "react-redux";
import { selectPlayers } from "../states/slices/playersSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [isRegistratedUser] = useAuthState(auth);
  const players = useSelector(selectPlayers);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRegistratedUser) navigate("/Auth");
  }, [isRegistratedUser, navigate]);

  const showRightData = <T extends TUserInfo>(arr: T[]): T | undefined => {
    const condition = arr.find((player) => player.email === isRegistratedUser?.email);
    return condition;
  };
  return <>{showRightData(players) ? <Table /> : <SendForm />}</>;
}
