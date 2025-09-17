import { firstLetterCapital } from "../../../utilities/functions";
import { TUserInfo } from "../../../types/Types";

type TPlayerInfoFields = {
  field: keyof TUserInfo;
  setCurrentFieldValue(key: keyof TUserInfo, value: string | boolean): void;
  measureValue: string | boolean;
  fieldAccess?: boolean;
};

export default function PlayerInfoFields(props: TPlayerInfoFields) {
  const { fieldAccess, setCurrentFieldValue, field, measureValue } = props;
  const cm = field === "height";
  const phone = field === "telephone";
  return (
    <div className="playerInfo-fields">
      <div>{firstLetterCapital(field)}:</div>
      {phone ? (
        <div>
          <a href={`tel:+1${measureValue}`}>{measureValue}</a>
        </div>
      ) : (
        <div>
          {measureValue && (
            <>
              {measureValue}{" "}
              {cm
                ? `cm  ${Math.round(+measureValue! / 2.54 / 1.2) / 10} ft`
                : ""}
            </>
          )}
        </div>
      )}
      {fieldAccess && (
        <div>
          <button onClick={() => setCurrentFieldValue(field, measureValue)}>
            <img src="/photos/pencil.png"></img>
          </button>
        </div>
      )}
    </div>
  );
}
