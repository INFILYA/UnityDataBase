import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import Button from "../utilities/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetWidth } from "../utilities/useSetWidth";
import { useEffect, useState } from "react";

export default function Header() {
  const [isRegistratedUser] = useAuthState(auth);
  const navigate = useNavigate();
  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);
  const isBurger = useSetWidth() > 768;

  useEffect(() => {
    isBurger && setBurgerMenu(false);
  }, [isBurger]);

  if (isRegistratedUser?.photoURL === null) return;

  async function logout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="header-background"></div>
      <div className="barWrapper">
        <div className="innerContainer">
          <div className="titleNavWrapper">
            {burgerMenu ? (
              <div className="burger-actions-logout-wrapper">
                <div className="social">
                  <a href="https://www.instagram.com/unityvball/" className="instagram">
                    <img alt="" src="/photos/instagram.jpg"></img>
                  </a>
                  <a href="https://www.facebook.com/unityvball">
                    <img alt="" src="/photos/facebook.jpg"></img>
                  </a>
                  <a href="https://www.youtube.com/channel/UC1IBZsYfkkOhisjKVlNQQIw">
                    <img alt="" src="/photos/youtube.jpg"></img>
                  </a>
                  <a href="https://twitter.com/UnityVballClub">
                    <img alt="" src="/photos/twitter.png"></img>
                  </a>
                </div>
                {isRegistratedUser && (
                  <div className="logout-button-wrapper">
                    <Button onClick={logout} text="Log out" type="button" />
                  </div>
                )}
              </div>
            ) : (
              <div className="logo">
                {!isRegistratedUser ? (
                  <div onClick={() => navigate("/")} style={{ display: "flex" }}>
                    <div className="unity-logo-wrapper">
                      <img src="photos/UnityLogoCuted.png" alt="" className="unity-image" />
                    </div>
                    <div className="unity-name-wrapper">
                      <img src="photos/UnityLogo.png" alt="" />
                    </div>
                  </div>
                ) : (
                  <div className="photoUrl-displayName-wrapper" onClick={() => navigate("/")}>
                    <img src={isRegistratedUser?.photoURL} alt="" />
                    <div>
                      {isRegistratedUser?.displayName || isRegistratedUser?.email} {}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {isBurger ? (
            <div className="acions-logout-wrapper">
              <div className="social">
                <a href="https://www.instagram.com/unityvball/" className="instagram">
                  <img alt="" src="/photos/instagram.jpg"></img>
                </a>
                <a href="https://www.facebook.com/unityvball">
                  <img alt="" src="/photos/facebook.jpg"></img>
                </a>
                <a href="https://www.youtube.com/channel/UC1IBZsYfkkOhisjKVlNQQIw">
                  <img alt="" src="/photos/youtube.jpg"></img>
                </a>
                <a href="https://twitter.com/UnityVballClub">
                  <img alt="" src="/photos/twitter.png"></img>
                </a>
              </div>
              {isRegistratedUser && (
                <div className="logout-button-wrapper">
                  <Button onClick={logout} text="Log out" type="button" />
                </div>
              )}
            </div>
          ) : (
            <div className="header-burger">
              <button type="button" onClick={() => setBurgerMenu(!burgerMenu)}>
                {!burgerMenu ? (
                  <div className="burger-box">
                    <div className="burger-inner">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <div className="close-burger-menu">X</div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
