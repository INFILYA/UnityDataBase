import { IFormW } from "../types/Types";

export default function FormWrapper(props: IFormW) {
  const { children, onSubmit } = props;
  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <div className="sign-logo-wrapper">
          <img alt="" src="/photos/UnityLogoCuted.png" />
          {/* <img alt="" src="/photos/PhilLogo.JPG" /> */}
        </div>
        <div className="email-wrapper">{children}</div>
      </form>
    </>
  );
}
