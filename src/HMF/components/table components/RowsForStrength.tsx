import { TUserInfo } from "../../../types/Types";
// import { upgradeAge } from "../../../utilities/functions";
import { useNavigate } from "react-router-dom";
import { useSetWidth } from "../../../utilities/useSetWidth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";

type TRows = {
  filteredPlayers: TUserInfo[];
};

export function RowsForStrength(props: TRows) {
  const [isRegistratedUser] = useAuthState(auth);
  const { filteredPlayers } = props;
  const navigate = useNavigate();
  const isBurger = useSetWidth() > 639;

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
          // style={
          //   player.evaluation && adminAccess
          //     ? {
          //         backgroundColor:
          //           player.position === "COACH"
          //             ? "gainsboro"
          //             : player.evaluation &&
          //               Object.values(player.evaluation).filter(
          //                 (skill) => skill === true
          //               ).length <= 0
          //             ? "orangered"
          //             : player.evaluation &&
          //               Object.values(player.evaluation).filter(
          //                 (skill) => skill === true
          //               ).length <= 1
          //             ? "orange"
          //             : player.evaluation &&
          //               Object.values(player.evaluation).filter(
          //                 (skill) => skill === true
          //               ).length <= 2
          //             ? "yellow"
          //             : "greenyellow",
          //       }
          //     : {}
          // }
        >
          <td>
            <div>
              {player.number}{" "}
              {adminAccess &&
                player.highlightsLink?.length === 0 &&
                player.highlights && <img src="/photos/Hourglass.png" />}{" "}
              {adminAccess && player.photo.startsWith(`C:`) && (
                <img src="/photos/noPhoto.png" />
              )}{" "}
              {adminAccess && player.highlightsLink && (
                <img src="/photos/ok.png" />
              )}
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
          <td>
            {Math.round(+player.standingVerticalJump / 2.54 / 1.2) / 10}{" "}
            {isBurger && "ft"}
          </td>
          <td>
            {Math.round(+player.approachingVerticalJump / 2.54 / 1.2) / 10}{" "}
            {isBurger && "ft"}
          </td>
          <td>
            {+player.twentyMeterSprint} {isBurger && "sec"}
          </td>
          <td>
            {+player.fourOnNineRun} {isBurger && "sec"}
          </td>
          <td>
            {Math.round(+player.pushUpsFromKnees)} {isBurger && "times"}
          </td>
          <td>
            {Math.round(+player.pullUpsOnLowBar)} {isBurger && "times"}
          </td>
          <td>
            {+player.overheadMedicineBallThrow} {isBurger && "m"}
          </td>
          <td>
            {Math.round(+player.plank)} {isBurger && "sec"}
          </td>
          {/* <td className="email-wrapper">
            <button
              onClick={() => copyEmail(player.email!)}
              title={`Copy ${player.firstName}'s ${player.lastName} Email`}
            >
              <img src="/photos/copy.png" />
            </button>
          </td> */}
        </tr>
      ))}
    </>
  );
}
