import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";
import { TUserInfo } from "../../types/Types";
import { compare, currentDate, upgradeAge } from "../../utilities/functions";
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
  const [showBirthday, setShowBirthday] = useState<boolean>(true);

  const isUserHaveProfile = (arr: TUserInfo[]): TUserInfo[] => {
    const choosenPlayer = arr.find((player) => player.email === isRegistratedUser?.email);
    const adminAccess =
      isRegistratedUser?.email === "infilya89@gmail.com" ||
      isRegistratedUser?.email === "daniel@unitysports.ca";
    if (adminAccess) return arr; // EXPERIMENt
    if (choosenPlayer?.position !== "Coach" && choosenPlayer?.position !== "Parent") {
      return arr.filter(
        (player) =>
          player.team === choosenPlayer?.team &&
          player.position !== "Coach" &&
          player.position !== "Parent"
      );
    } else return arr.filter((player) => player.team === choosenPlayer?.team);
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
  const DOB = filteredPlayers.filter((player) => player.birthday.includes(currentDate()));

  return (
    <SectionWrapper>
      <div className="table-section">
        <h1>Players Table</h1>
        {isChoosenFilter && DOB.length > 0 && showBirthday && (
          <div className="happy-birthday-block-wrapper">
            <div>
              <h1>Happy Birthday</h1>
              <img src="/photos/confetti.png"></img>
              <div className="close-button-wrapper">
                <button onClick={() => setShowBirthday(false)}>X</button>
              </div>
            </div>
            <ul>
              {DOB.map((player, index) => (
                <li key={index}>
                  {player.firstName + " " + player.lastName + " - " + upgradeAge(player).birthday}
                </li>
              ))}
            </ul>
          </div>
        )}
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
