import { ChangeEvent } from "react";
import { Fieldset } from "../../../css/UnityDataBase.styled";
import { TUserInfo } from "../../../types/Types";
import { firstLetterCapital, styledComponentValidator } from "../../../utilities/functions";

type TFormFields = {
  access: boolean;
  field: keyof TUserInfo;
  type?: "text" | "tel" | "date" | "range" | "file";
  value?: string;
  onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
  measureValue?: string;
  min?: number;
  max?: number;
};

export default function FormFields(props: TFormFields) {
  const { field, onChange, type, value, access, measureValue, min, max } = props;
  const cm = field === "reach" || field === "height";
  const kg = field === "weight";

  const hand = field === "hand";
  return (
    <Fieldset valid={styledComponentValidator(access)}>
      <legend>
        <div className="forspan">
          <span>
            <strong>{firstLetterCapital(field)}</strong>
          </span>
          {access && <span> (required)</span>}
        </div>
      </legend>
      <div className="measure-wrapper">
        {measureValue && (
          <div>
            {measureValue}{" "}
            {cm
              ? `cm  ${Math.round(+measureValue! / 2.54 / 1.2) / 10} ft`
              : kg
              ? `kg ${Math.round(+measureValue * 2.2)} lbs`
              : ""}
          </div>
        )}
        {!hand && (
          <input
            type={type}
            onChange={onChange}
            value={value}
            name={field}
            required
            min={min}
            max={max}
          />
        )}
        {hand && (
          <select onChange={onChange} name={field} value={value}>
            <option value="">Choose hand</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="ambidextrous">Ambidextrous</option>
          </select>
        )}
      </div>
    </Fieldset>
  );
}
