import { TUserInfo } from "../../../types/Types";
import { useSetWidth } from "../../../utilities/useSetWidth";
import { RowsForMobility } from "./RowsForMobility";

type TCategorys = {
  filteredPlayers: TUserInfo[];
  rankByValue<T extends TUserInfo>(criteria: keyof T, arr: T[]): void;
};

export function CategorysMobility(props: TCategorys) {
  const { filteredPlayers, rankByValue } = props;
  const isBurger = useSetWidth() > 639;
  const categorys = [
    "#",
    "Name",
    "Posit",
    "Height",
    "Apley Scratch",
    "Knee-to-wall",
    "Sit & reach",
    "Shoulder flex",
    "Seated trunk",
    "Butterfly",
  ];
  const criterias = [
    "number",
    "firstName",
    "position",
    "height",
    "apleyScratch",
    "kneeToWall",
    "sitAndReach",
    "shoulderFlexion",
    "seatedTrunk",
    "butterfly",
  ] as const;

  return (
    <>
      <tr>
        {categorys.map((category, index) => (
          <th
            key={category}
            onClick={() => rankByValue(criterias[index], filteredPlayers)}
          >
            <button
              title={`Click to sort by ${category}`}
              style={{ transform: isBurger ? "rotate(0deg)" : "rotate(90deg)" }}
            >
              {category}
            </button>
          </th>
        ))}
      </tr>
      <RowsForMobility filteredPlayers={filteredPlayers} />
    </>
  );
}
