import { TUserInfo } from "../../../types/Types";
import { upgradeAge } from "../../../utilities/functions";
import { useNavigate } from "react-router-dom";
import { useSetWidth } from "../../../utilities/useSetWidth";

type TRows = {
  filteredPlayers: TUserInfo[];
};

export function Rows(props: TRows) {
  const { filteredPlayers } = props;
  const navigate = useNavigate();
  const isBurger = useSetWidth() > 768;

  return (
    <>
      {filteredPlayers.map((player) => (
        <tr
          key={player.email}
          className="rating-row"
          onClick={() => navigate(`/PlayerInfo?player=${player.email}`)}
        >
          <td>{player.number}</td>
          <td className="rating-player-name">
            {isBurger && player.firstName} {player.lastName}
          </td>
          <td>{upgradeAge(player).birthday}</td>
          <td>{player.position}</td>
          <td>{Math.round(+player.height / 2.54 / 1.2) / 10} ft</td>
          <td>{Math.round(+player.weight * 2.2)} lbs</td>
          <td>{Math.round(+player.reach / 2.54 / 1.2) / 10} ft</td>
        </tr>
      ))}
    </>
  );
}
