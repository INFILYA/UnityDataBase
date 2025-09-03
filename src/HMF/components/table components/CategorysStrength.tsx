import { TUserInfo } from "../../../types/Types";
import { useSetWidth } from "../../../utilities/useSetWidth";
import { RowsForStrength } from "./RowsForStrength";

type TCategorys = {
  filteredPlayers: TUserInfo[];
  rankByValue<T extends TUserInfo>(criteria: keyof T, arr: T[]): void;
};

export function CategorysStrength(props: TCategorys) {
  const { filteredPlayers, rankByValue } = props;
  const isBurger = useSetWidth() > 639;
  const categorys = [
    "#",
    "Name",
    "SVJ",
    "AVJ",
    "20m Sprint",
    "4 x 9",
    "Push ups",
    "Pull ups",
    "Ball throw",
    "Plank",
  ];
  const criterias = [
    "number",
    "firstName",
    "standingVerticalJump",
    "approachingVerticalJump",
    "twentyMeterSprint",
    "fourOnNineRun",
    "pushUpsFromKnees",
    "pullUpsOnLowBar",
    "overheadMedicineBallThrow",
    "plank",
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
      <RowsForStrength filteredPlayers={filteredPlayers} />
    </>
  );
}
