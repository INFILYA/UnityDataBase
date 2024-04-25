import { useSelector } from "react-redux";
import { setPlayers } from "../../../states/slices/playersSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { TUserInfo } from "../../../types/Types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../utilities/Button";
import { auth, playersRef, storage } from "../../../config/firebase";
import SectionWrapper from "../../../wpappers/SectionWrapper";
import { useAppDispatch } from "../../../states/store";
import { checkPhotoFormat } from "../../../utilities/functions";
import { selectUserInfo, setUserInfo } from "../../../states/slices/userInfoSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { onValue, remove, update } from "firebase/database";
import FormWrapper from "../../../wpappers/FormWrapper";
import { ref, uploadBytes } from "firebase/storage";
// import { selectuserToCompare, setUserToCompare } from "../../../states/slices/userToCompareSlice";
import FormFields from "../fields/FormFields";
import PlayerInfoFields from "../fields/PlayerInfoFields";

export default function PlayerInfo() {
  const [searchParams] = useSearchParams();
  const userInfo = useSelector(selectUserInfo);
  // const userToCompare = useSelector(selectuserToCompare);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRegistratedUser] = useAuthState(auth);
  const [currentField, setCurrentField] = useState<keyof TUserInfo | "">("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [showHighlights, setShowHighlights] = useState<boolean>(false);
  const [confirmationHighlights, setConfirmationHighlights] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  // const [showCompareWindow, setShowCompareWindow] = useState<string>("");

  const myParam = searchParams.get("player");

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       if (isRegistratedUser) {
  //         dispatch(fetchUsersList());
  //         if (myParam)
  //           dispatch(setUserInfo(myParam));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getData();
  // }, [dispatch, isRegistratedUser]);
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
                dispatch(setUserInfo(updatedPlayers.find((player) => player.email === myParam)!));
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [dispatch, isRegistratedUser, myParam]);
  //Видаляю профайл
  const deletePlayerProfile = async () => {
    try {
      // Видаляю гравця
      await remove(playersRef(id));
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/");
    }
  };

  //Змінюю профайл
  const setEditedProfile = async (updatedInfo: TUserInfo) => {
    try {
      // Змінюю поле гравця
      await update(playersRef(id), updatedInfo);
      if (!fileUpload) return;
      const filesFoldersRef = ref(storage, `playersPhotos/${id}/${fileUpload.name}`);
      await uploadBytes(filesFoldersRef, fileUpload);
    } catch (e) {
      console.error(e);
    } finally {
      setCurrentField("");
      setFileUpload(null);
    }
  };

  const setCurrentFieldValue = (key: keyof TUserInfo, value: string) => {
    setCurrentField(key);
    if (key === "photo") {
      setCurrentValue("");
    } else setCurrentValue(value);
  };
  const handleEditField = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentValue(e.target.value);
  };

  function handleUserNumberChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 1) {
      const value = `0${e.target.value}`;
      setCurrentValue(value);
    } else setCurrentValue(e.target.value);
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputNumber = e.target.value.replace(/\D/g, "");
    inputNumber = inputNumber.substring(0, 10);
    if (inputNumber.length > 3) {
      inputNumber = inputNumber.substring(0, 3) + "-" + inputNumber.substring(3);
    }
    if (inputNumber.length > 7) {
      inputNumber = inputNumber.substring(0, 7) + "-" + inputNumber.substring(7);
    }
    setCurrentValue(inputNumber);
  };

  function handleUserUpload(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;
    setFileUpload(files[0]);
    setCurrentValue(e.target.value);
  }

  function cancel() {
    setCurrentField("");
    setFileUpload(null);
  }

  function confirmHighlights() {
    setEditedProfile({
      ...userInfo,
      highlights: true,
      highlightsLink: [""],
    });
    setConfirmationHighlights(false);
  }

  // const selectPlayerToCompare = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   setShowCompareWindow(event.target.value);
  //   const userToCompare = players.find((player) => player.email === event.target.value);
  //   if (!userToCompare) return;
  //   dispatch(setUserToCompare(userToCompare));
  // };

  const properPhoneLength = currentValue.length !== 12;
  const adminAccess = isRegistratedUser?.email === "infilya89@gmail.com";
  const fieldAccess = isRegistratedUser?.email === myParam || adminAccess;
  const disabledButton =
    currentField === "telephone" ? properPhoneLength : currentValue.length <= 1;
  if (userInfo === undefined || userInfo === null) return;
  const id = `${userInfo?.firstName} ${userInfo?.lastName}, ${userInfo.team}`;
  const highlightsDenied = userInfo.position === "Coach" || userInfo.position === "Parent";
  // const filteredPlayers = players.filter(
  //   (player) =>
  //     player.team === userInfo.team && player.position !== "Coach" && player.position !== "Parent"
  // );

  return (
    <SectionWrapper>
      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        <h2>
          {userInfo?.firstName} {userInfo?.lastName}
        </h2>
        <div className="playerInfo-wrapper">
          <div className="download-button-wrapper">
            <button onClick={() => navigate("/")} title={`Navigate Back`}>
              <img src={`/photos/Home.png`} />
            </button>
            {fieldAccess ? (
              <button
                onClick={() => setCurrentFieldValue("photo", userInfo.photo)}
                title={`Download photo`}
              >
                <img src={`/photos/Download.png`} />
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <div className="player-photo-wrapper">
            {/* {showCompareWindow ? (
              <div className="dual-photos-wrapper">
                <img src={`/photos/${userInfo.photo}`} alt="" />
                <img src={`/photos/${userToCompare.photo}`} alt="" />
              </div>
            ) : ( */}
            <img src={`/photos/${userInfo.photo}`} alt="" />
            {/* )} */}
          </div>
          {/* {!highlightsDenied && (
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
                {showCompareWindow && <button onClick={() => setShowCompareWindow("")}>X</button>}
              </div>
            </div>
          )}
          {showCompareWindow && <Diagramm />} */}
          {/* Photo */}
          {currentField === "photo" && (
            <FormFields
              access={checkPhotoFormat(fileUpload?.name)}
              field="photo"
              type="file"
              onChange={handleUserUpload}
            />
          )}
          {/* Birthday */}
          {currentField === "birthday" ? (
            <FormFields
              access={!currentValue}
              field="birthday"
              type="date"
              value={currentValue}
              onChange={handleEditField}
            />
          ) : (
            <PlayerInfoFields
              field="birthday"
              setCurrentFieldValue={setCurrentFieldValue}
              measureValue={userInfo.birthday}
            />
          )}
          {/* Telephone */}
          {fieldAccess && (
            <>
              {currentField === "telephone" ? (
                <FormFields
                  access={properPhoneLength}
                  field="telephone"
                  type="tel"
                  value={currentValue}
                  onChange={handlePhoneChange}
                />
              ) : (
                <PlayerInfoFields
                  field="telephone"
                  setCurrentFieldValue={setCurrentFieldValue}
                  measureValue={userInfo.telephone}
                />
              )}
            </>
          )}
          <>
            {/* Hand */}
            {currentField === "hand" ? (
              <FormFields
                access={!currentValue}
                field="hand"
                value={currentValue}
                onChange={handleEditField}
              />
            ) : (
              <PlayerInfoFields
                field="hand"
                setCurrentFieldValue={setCurrentFieldValue}
                measureValue={userInfo.hand}
              />
            )}
            {/* Height */}
            {currentField === "height" ? (
              <FormFields
                access={!currentValue}
                field="height"
                type="range"
                value={currentValue}
                onChange={handleEditField}
                measureValue={currentValue}
                min={150}
                max={220}
              />
            ) : (
              <PlayerInfoFields
                field="height"
                setCurrentFieldValue={setCurrentFieldValue}
                measureValue={userInfo.height}
              />
            )}
            {/* Weight */}
            {currentField === "weight" ? (
              <FormFields
                access={!currentValue}
                field="weight"
                type="range"
                value={currentValue}
                onChange={handleEditField}
                measureValue={currentValue}
                min={40}
                max={120}
              />
            ) : (
              <PlayerInfoFields
                field="weight"
                setCurrentFieldValue={setCurrentFieldValue}
                measureValue={userInfo.weight}
              />
            )}
            {/* Reach Height */}
            {currentField === "reach" ? (
              <FormFields
                access={!currentValue}
                field="reach"
                type="range"
                value={currentValue}
                onChange={handleEditField}
                measureValue={currentValue}
                min={280}
                max={380}
              />
            ) : (
              <PlayerInfoFields
                field="reach"
                setCurrentFieldValue={setCurrentFieldValue}
                measureValue={userInfo.reach}
              />
            )}
            {/* Number */}
            {currentField === "number" ? (
              <FormFields
                access={!currentValue}
                field="number"
                type="range"
                value={currentValue}
                onChange={handleUserNumberChange}
                measureValue={`# ${currentValue}`}
                min={0}
                max={99}
              />
            ) : (
              <PlayerInfoFields
                field="number"
                setCurrentFieldValue={setCurrentFieldValue}
                measureValue={userInfo.number}
              />
            )}
          </>

          {currentField || !checkPhotoFormat(fileUpload?.name) ? (
            <div className="nav-buttons">
              <Button
                type="button"
                text="OK"
                onClick={() => setEditedProfile({ ...userInfo, [currentField]: currentValue })}
                disabled={
                  disabledButton || (currentField === "photo" && checkPhotoFormat(currentValue))
                }
              />
              <Button type="button" text="Cancel" onClick={() => cancel()} />
            </div>
          ) : (
            <>
              {userInfo.highlightsLink ? (
                <>
                  {showHighlights ? (
                    <>
                      <div className="iframe-wrapper">
                        <Button
                          type="button"
                          text="Hide highlights"
                          onClick={() => setShowHighlights(!showHighlights)}
                        />
                        {userInfo?.highlightsLink.map((link) => (
                          <iframe src={link} title="YouTube video player" allowFullScreen></iframe>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="iframe-wrapper">
                      <Button
                        type="button"
                        text="Show highlights 2023/2024"
                        onClick={() => setShowHighlights(!showHighlights)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="iframe-wrapper">
                  {confirmationHighlights ? (
                    <div className="confirm-wrapper">
                      <div>Are you sure?</div>
                      {/* add here normal desripion */}
                      <Button type="button" text="Confirm" onClick={confirmHighlights} />
                      <Button
                        type="button"
                        text="Cancel"
                        onClick={() => setConfirmationHighlights(false)}
                      />
                    </div>
                  ) : (
                    <>
                      {fieldAccess && !highlightsDenied && !adminAccess &&(
                        <>
                          {userInfo.highlights ? (
                            <div className="playerInfo-fields" style={{ justifyContent: "center" }}>
                              <label style={{ color: "black" }}>
                                Highlights will be here , soon...
                              </label>
                            </div>
                          ) : (
                            <Button
                              type="button"
                              text="Make highlights 2023/2024"
                              style={{ background: "orangered" }}
                              onClick={() => setConfirmationHighlights(true)}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
              {!highlightsDenied && (
                <div className="iframe-wrapper">
                  <Button
                    type="button"
                    text="Additional Stats"
                    onClick={() => navigate(`/AdditionalStat?player=${userInfo.email}`)}
                  />
                </div>
              )}
              {!confirmationHighlights && (
                <div className="nav-buttons">
                  {fieldAccess && (
                    <Button type="button" text="Delete Profile" onClick={deletePlayerProfile} />
                  )}
                  <Button type="button" text="Back" onClick={() => navigate(-1)} />
                </div>
              )}
            </>
          )}
        </div>
      </FormWrapper>
    </SectionWrapper>
  );
}
