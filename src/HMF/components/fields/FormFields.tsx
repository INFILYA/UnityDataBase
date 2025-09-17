import { ChangeEvent } from "react";
import { Fieldset } from "../../../css/UnityDataBase.styled";
import { TUserInfo } from "../../../types/Types";
import {
  firstLetterCapital,
  styledComponentValidator,
} from "../../../utilities/functions";

type TFormFields = {
  access: boolean;
  field: keyof TUserInfo;
  type?: "text" | "tel" | "date" | "range" | "file";
  value?: string;
  onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
  measureValue?: string;
  min?: number;
  max?: number;
  step?: number;
};

export default function FormFields(props: TFormFields) {
  const { field, onChange, type, value, access, measureValue, min, max, step } =
    props;
  const cm = field === "height";
  const photo = field === "photo";
  return (
    <Fieldset valid={styledComponentValidator(access)}>
      <legend>
        <div className="forspan">
          <span>
            <strong>{firstLetterCapital(field)}</strong>
          </span>
          {access && !photo && <span> (required)</span>}
          {access && photo && <span>(File resolution is invalid)</span>}
        </div>
      </legend>
      <div className="measure-wrapper">
        {measureValue && (
          <div>
            {measureValue}{" "}
            {cm ? `cm  ${Math.round(+measureValue! / 2.54 / 1.2) / 10} ft` : ""}
          </div>
        )}
        <input
          type={type}
          onChange={onChange}
          value={value}
          name={field}
          required
          min={min}
          max={max}
          step={step}
        />
      </div>
    </Fieldset>
  );
}
