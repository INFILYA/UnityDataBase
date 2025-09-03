import { useNavigate, useSearchParams } from "react-router-dom";
import SectionWrapper from "../../../wpappers/SectionWrapper";
import FormWrapper from "../../../wpappers/FormWrapper";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, playersRef } from "../../../config/firebase";
import { onValue } from "firebase/database";
import { useAppDispatch } from "../../../states/store";
import { TUserInfo } from "../../../types/Types";
import { selectPlayers, setPlayers } from "../../../states/slices/playersSlice";
import {
  selectUserInfo,
  setUserInfo,
} from "../../../states/slices/userInfoSlice";
import { useSelector } from "react-redux";
import {
  selectuserToCompare,
  setUserToCompare,
} from "../../../states/slices/userToCompareSlice";
import Diagramm from "./Diagramm";
import Button from "../../../utilities/Button";

export default function AdditionalStat() {
  const [isRegistratedUser] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const players = useSelector(selectPlayers);
  const userToCompare = useSelector(selectuserToCompare);
  const [showCompareWindow, setShowCompareWindow] = useState<string>("");

  const [searchParams] = useSearchParams();
  const myParam = searchParams.get("player");
  useEffect(() => {
    async function getData() {
      try {
        if (isRegistratedUser) {
          onValue(playersRef(""), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
              const updatedPlayers = Object.values(data) as TUserInfo[];
              dispatch(setPlayers(updatedPlayers));
              if (myParam)
                dispatch(
                  setUserInfo(
                    updatedPlayers.find((player) => player.email === myParam)!
                  )
                );
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [dispatch, isRegistratedUser, myParam]);

  const selectPlayerToCompare = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShowCompareWindow(event.target.value);
    const userToCompare = players.find(
      (player) => player.email === event.target.value
    );
    if (!userToCompare) return;
    dispatch(setUserToCompare(userToCompare));
  };
  const filteredPlayers = players.filter(
    (player) => player.team === userInfo.team && player.position !== "COACH"
  );
  return (
    <SectionWrapper>
      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        <h2>
          {userInfo?.firstName} {userInfo?.lastName}
        </h2>
        <div className="playerInfo-wrapper">
          <div className="player-photo-wrapper">
            {showCompareWindow ? (
              <div className="dual-photos-wrapper">
                <img src={`/photos/${userInfo.photo}`} alt="" />
                <img src={`/photos/${userToCompare.photo}`} alt="" />
              </div>
            ) : (
              <img src={`/photos/${userInfo.photo}`} alt="" />
            )}
          </div>
          <div className="compare-block-wrapper">
            <div>
              <h3>
                <strong>Compare with</strong>
              </h3>
            </div>
            <div>
              <select onChange={selectPlayerToCompare}>
                <option value="">Choose Player</option>
                {filteredPlayers.map((player, index) => (
                  <option key={index} value={player.email!}>
                    {player.firstName} {player.lastName}
                  </option>
                ))}
              </select>
              {showCompareWindow && (
                <button onClick={() => setShowCompareWindow("")}>X</button>
              )}
            </div>
          </div>
          {showCompareWindow && <Diagramm />}
          <div className="nav-buttons">
            <Button type="button" text="Back" onClick={() => navigate(-1)} />
          </div>
        </div>
      </FormWrapper>
    </SectionWrapper>
  );
}
