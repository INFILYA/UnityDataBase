import { auth, googleProvider } from "../../config/firebase";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import SectionWrapper from "../../wpappers/SectionWrapper";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../utilities/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { checkUserEmail } from "../../utilities/functions";
import FormWrapper from "../../wpappers/FormWrapper";

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const [isRegistratedUser] = useAuthState(auth);
  const [email, setEmail] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    async function signInWithEmail() {
      try {
        if (isRegistratedUser) {
          navigate("/");
        } else {
          if (isSignInWithEmailLink(auth, window.location.href)) {
            await signInWithEmailLink(
              auth,
              localStorage.getItem("unityUserEmail")!,
              window.location.href
            );
            localStorage.removeItem("unityUserEmail");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    signInWithEmail();
  }, [isRegistratedUser, navigate, search]);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoginLoading(true);
      await sendSignInLinkToEmail(auth, email, {
        url: "https://unity-data-base-628a9.web.app/Auth",
        handleCodeInApp: true,
        dynamicLinkDomain: "unitydatabase.page.link",
      });
      localStorage.setItem("unityUserEmail", email);
      alert("We have sent you link on email");
      setLoginError("");
    } catch (err) {
      console.error(err);
      setLoginError(err as string);
    } finally {
      setIsLoginLoading(false);
    }
  }

  return (
    <SectionWrapper>
      <FormWrapper onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <div className="auth-wrapper">
          <div className="email-field-content">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="btn-submit-wrapper">
            <Button
              type="submit"
              text={isLoginLoading ? "Signing you in" : "Sign in"}
              disabled={checkUserEmail(email)}
            />
          </div>
          <div>{loginError}</div>
        </div>
        <div className="border-wrapper">
          <div></div>
          <label>Or</label>
          <div></div>
        </div>
        <div className="google-button-wrapper">
          <Button
            type="button"
            onClick={signInWithGoogle}
            text={
              <div>
                <img src="/photos/google.jpg" alt="" />
                <div>Continue with Google</div>
              </div>
            }
          />
        </div>
      </FormWrapper>
    </SectionWrapper>
  );
}
