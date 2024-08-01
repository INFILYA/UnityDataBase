import { TUserInfo } from "../../../types/Types";
import { upgradeAge } from "../../../utilities/functions";
import { useNavigate } from "react-router-dom";
import { useSetWidth } from "../../../utilities/useSetWidth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";

type TRows = {
  filteredPlayers: TUserInfo[];
};

export function Rows(props: TRows) {
  const [isRegistratedUser] = useAuthState(auth);
  const { filteredPlayers } = props;
  const navigate = useNavigate();
  const isBurger = useSetWidth() > 639;
  const adminAccess =
    isRegistratedUser?.email === "infilya89@gmail.com" ||
    isRegistratedUser?.email === "kera.salvi@unitysports.ca";
  return (
    <>
      {filteredPlayers.map((player) => (
        <tr
          key={player.email}
          className="rating-row"
          onClick={() => navigate(`/PlayerInfo?player=${player.email}`)}
          style={
            player.position === "Coach" || adminAccess
              ? {
                  backgroundColor:
                    player.position === "Coach" || player.position === "Parent"
                      ? "gainsboro"
                      : player.evaluation &&
                        Object.values(player.evaluation).filter((skill) => skill === true).length <=
                          1
                      ? "orangered"
                      : player.evaluation &&
                        Object.values(player.evaluation).filter((skill) => skill === true).length <=
                          2
                      ? "orange"
                      : player.evaluation &&
                        Object.values(player.evaluation).filter((skill) => skill === true).length <=
                          3
                      ? "yellow"
                      : player.evaluation
                      ? "greenyellow"
                      : "transparent",
                }
              : {}
          }
        >
          <td>
            <div>
              {player.number}{" "}
              {adminAccess && player.highlightsLink?.length === 0 && player.highlights && (
                <img src="/photos/Hourglass.png" />
              )}{" "}
              {adminAccess && player.photo.startsWith(`C:`) && <img src="/photos/noPhoto.png" />}{" "}
              {adminAccess && player.highlightsLink && <img src="/photos/ok.png" />}
            </div>
          </td>
          <td className="rating-player-name">
            {isBurger && player.firstName} {player.lastName}
          </td>
          <td>{upgradeAge(player).birthday}</td>
          <td>{player.position}</td>
          <td>
            {Math.round(+player.height / 2.54 / 1.2) / 10} {isBurger && "ft"}
          </td>
          <td>
            {Math.round(+player.weight * 2.2)} {isBurger && "lbs"}
          </td>
          <td>
            {Math.round(+player.reach / 2.54 / 1.2) / 10} {isBurger && "ft"}
          </td>
        </tr>
      ))}
    </>
  );
}
