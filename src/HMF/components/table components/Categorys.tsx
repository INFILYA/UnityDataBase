import { TUserInfo } from "../../../types/Types";
import { Rows } from "./Rows";

type TCategorys = {
  filteredPlayers: TUserInfo[];
  rankByValue<T extends TUserInfo>(criteria: keyof T, arr: T[]): void;
};

export function Categorys(props: TCategorys) {
  const { filteredPlayers, rankByValue } = props;
  const categorys = ["#", "Name", "Age", "Position", "Height", "Weight", "Reach"];
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
          <th key={category}>
            <button
              onClick={() => rankByValue(criterias[index], filteredPlayers)}
              title={`Click to sort by ${category}`}
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
