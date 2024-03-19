import { TBUttonProps } from "../types/Types";

export default function Button(props: TBUttonProps) {
  const { text, type, onClick, disabled, style } = props;
  return (
    <button
      className="regular-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
}
