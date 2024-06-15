import { firstLetterCapital } from "../../../utilities/functions";
import { TUserInfo } from "../../../types/Types";

type TPlayerInfoFields = {
  field: keyof TUserInfo;
  setCurrentFieldValue(key: keyof TUserInfo, value: string): void;
  measureValue: string;
  fieldAccess?: boolean;
};

export default function PlayerInfoFields(props: TPlayerInfoFields) {
  const { fieldAccess, setCurrentFieldValue, field, measureValue } = props;
  const cm = field === "reach" || field === "height";
  const kg = field === "weight";

  return (
    <div className="playerInfo-fields">
      <div>{firstLetterCapital(field)}:</div>
      <div>
        {measureValue && (
          <>
            {measureValue}{" "}
            {cm
              ? `cm  ${Math.round(+measureValue! / 2.54 / 1.2) / 10} ft`
              : kg
              ? `kg ${Math.round(+measureValue * 2.2)} lbs`
              : ""}
          </>
        )}
      </div>
      {fieldAccess ||
        (true && (
          <div>
            <button onClick={() => setCurrentFieldValue(field, measureValue)}>
              <img src="/photos/pencil.png"></img>
            </button>
          </div>
        ))}
    </div>
  );
}
