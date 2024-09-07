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

  function copyEmail(email: string) {
    const textToCopy = email;
    navigator.clipboard
      .writeText(textToCopy)
      .then(function () {
        alert("Email copied: " + textToCopy);
      })
      .catch(function (error) {
        console.error("Failed to copy email: ", error);
      });
  }

  const adminAccess =
    isRegistratedUser?.email === "infilya89@gmail.com" ||
    isRegistratedUser?.email === "miguel.sergio@unitysports.ca" ||
    isRegistratedUser?.email === "orest@unitysports.ca" ||
    isRegistratedUser?.email === "brian.flores@unitysports.ca";

  return (
    <>
      {filteredPlayers.map((player) => (
        <tr
          key={player.email}
          className="rating-row"
          style={
            player.evaluation && adminAccess
              ? {
                  backgroundColor:
                    player.position === "Coach"
                      ? "gainsboro"
                      : player.evaluation &&
                        Object.values(player.evaluation).filter((skill) => skill === true).length <=
                          0
                      ? "orangered"
                      : player.evaluation &&
                        Object.values(player.evaluation).filter((skill) => skill === true).length <=
                          1
                      ? "orange"
                      : player.evaluation &&
                        Object.values(player.evaluation).filter((skill) => skill === true).length <=
                          2
                      ? "yellow"
                      : "greenyellow",
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
          <td
            className="rating-player-name"
            onClick={() => navigate(`/PlayerInfo?player=${player.email}`)}
          >
            <div>
              {isBurger && player.firstName} {player.lastName}
            </div>
          </td>
          <td>{upgradeAge(player).birthday}</td>
          <td>{player.position}</td>
          <td>
            {Math.round(+player.height / 2.54 / 1.2) / 10} {isBurger && "ft"}
          </td>
          <td>
            {Math.round(+player.reach / 2.54 / 1.2) / 10} {isBurger && "ft"}
          </td>
          <td className="email-wrapper">
            <button
              onClick={() => copyEmail(player.email!)}
              title={`Copy ${player.firstName}'s ${player.lastName} Email`}
            >
              <img src="/photos/copy.png" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
