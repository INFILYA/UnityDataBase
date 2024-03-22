import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";
import { TUserInfo } from "../../types/Types";
import { compare } from "../../utilities/functions";
import SectionWrapper from "../../wpappers/SectionWrapper";
import Button from "../../utilities/Button";
import { Categorys } from "./table components/Categorys";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../states/slices/playersSlice";

export default function Table() {
  const [isRegistratedUser] = useAuthState(auth);
  const players = useSelector(selectPlayers);
  const [filteredPlayers, setFilteredPlayers] = useState<TUserInfo[]>([]);
  const [isChoosenFilter, setChoosenFilter] = useState<boolean>(false);
  const [isBiggest, setIsBiggest] = useState<boolean>(false);

  const isUserHaveProfile = (arr: TUserInfo[]): TUserInfo[] => {
    if (
      isRegistratedUser?.email === "infilya89@gmail.com" ||
      isRegistratedUser?.email === "daniel@unitysports.ca"
    )
      return arr; // EXPERIMENt
    if (arr.find((player) => player.email === isRegistratedUser?.email)?.position !== "Coach") {
      return arr.filter(
        (player) =>
          player.team === arr.find((player) => player.email === isRegistratedUser?.email)?.team &&
          player.position !== "Coach"
      );
    } else
      return arr.filter(
        (player) =>
          player.team === arr.find((player) => player.email === isRegistratedUser?.email)?.team
      );
  };

  const filterForTeams = (team: string) => {
    const filteredPlayers = isUserHaveProfile(players)
      .filter((player) => player.team === team)
      .sort((a, b) => compare(a.number, b.number));
    setFilteredPlayers(filteredPlayers);
    setChoosenFilter(true);
  };

  function rankByValue<T extends TUserInfo>(criteria: keyof T, arr: T[]) {
    !isBiggest
      ? arr.sort((a, b) => compare(b[criteria], a[criteria]))
      : arr.sort((a, b) => compare(a[criteria], b[criteria]));
    setIsBiggest(!isBiggest);
  }

  const teams = [...new Set(isUserHaveProfile(players).map((player) => player.team))];

  return (
    <SectionWrapper>
      <div className="table-section">
        <h1 style={{ textAlign: "center" }}>Players Table</h1>
        <table>
          <caption>
            <nav>
              {teams.map((team) => (
                <div key={team} className="table-nav-buttons">
                  <Button text={team} type="button" onClick={() => filterForTeams(team)} />
                </div>
              ))}
            </nav>
          </caption>
          {isChoosenFilter && (
            <tbody className="rating-table-wrapper">
              <Categorys filteredPlayers={filteredPlayers} rankByValue={rankByValue} />
            </tbody>
          )}
        </table>
      </div>
    </SectionWrapper>
  );
}
