import { TUserInfo } from "../../../types/Types";
import { useSetWidth } from "../../../utilities/useSetWidth";
import { Rows } from "./Rows";

type TCategorys = {
  filteredPlayers: TUserInfo[];
  rankByValue<T extends TUserInfo>(criteria: keyof T, arr: T[]): void;
};

export function Categorys(props: TCategorys) {
  const { filteredPlayers, rankByValue } = props;
  const isBurger = useSetWidth() > 639;

  const categorys = ["#", "Name", "Age", "Posit", "Height", "Weight", "Reach"];
  const criterias = [
    "number",
    "firstName",
    "birthday",
    "position",
    "height",
    "weight",
    "reach",
  ] as const;
  const players = filteredPlayers.filter(
    (profile) => profile.position !== "Parent" && profile.position !== "Coach"
  );
  const parents = filteredPlayers.filter((profile) => profile.position === "Parent");
  const coaches = filteredPlayers.filter((profile) => profile.position === "Coach");

  return (
    <>
      <tr>
        {categorys.map((category, index) => (
          <th key={category} onClick={() => rankByValue(criterias[index], filteredPlayers)}>
            <button
              title={`Click to sort by ${category}`}
              style={{ transform: isBurger ? "rotate(0deg)" : "rotate(90deg)" }}
            >
              {category}
            </button>
          </th>
        ))}
      </tr>
      <Rows filteredPlayers={players} />
      <Rows filteredPlayers={coaches} />
      <Rows filteredPlayers={parents} />
    </>
  );
}
// transform: rotate(90deg);
