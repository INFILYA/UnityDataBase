import { useSelector } from "react-redux";
import { setPlayers } from "../../../states/slices/playersSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { TUserInfo } from "../../../types/Types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../utilities/Button";
import { auth, playersRef, storage } from "../../../config/firebase";
import SectionWrapper from "../../../wpappers/SectionWrapper";
import { useAppDispatch } from "../../../states/store";
import { Fieldset } from "../../../css/UnityDataBase.styled";
import {
  checkPhotoFormat,
  firstLetterCapital,
  styledComponentValidator,
} from "../../../utilities/functions";
import { selectUserInfo, setUserInfo } from "../../../states/slices/userInfoSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { onValue, remove, update, set } from "firebase/database";
import FormWrapper from "../../../wpappers/FormWrapper";
import { ref, uploadBytes } from "firebase/storage";

export default function PlayerInfo() {
  const [searchParams] = useSearchParams();
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isRegistratedUser] = useAuthState(auth);
  const [currentField, setCurrentField] = useState<keyof TUserInfo | "">("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [showHighlights, setShowHighlights] = useState<boolean>(false);
  const [confirmationHighlights, setConfirmationHighlights] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [showDownloadBar, setShowDownloadBar] = useState<boolean>(false);

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
    } catch (e) {
      console.error(e);
    } finally {
      setCurrentField("");
    }
  };

  const setCurrentFieldValue = (key: keyof TUserInfo, value: string) => {
    setCurrentField(key);
    setCurrentValue(value);
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
    dispatch(setUserInfo({ ...userInfo, photo: files[0].name }));
  }

  const downloadNewPhoto = async () => {
    try {
      if (!fileUpload) return;
      const filesFoldersRef = ref(storage, `playersPhotos/${id}/${fileUpload.name}`);
      await uploadBytes(filesFoldersRef, fileUpload);
      await set(playersRef(id), { ...userInfo, photo: fileUpload.name });
    } catch (err) {
      console.error(err);
    }
  };
  function cancelDownload() {
    setShowDownloadBar(false);
    setFileUpload(null);
  }

  function confirmHighlights() {
    setEditedProfile({
      ...userInfo,
      highlights: true,
      highlightsLink: "",
    });
    setConfirmationHighlights(false);
  }

  const properPhoneLength = currentValue.length !== 12;
  const fieldAccess =
    isRegistratedUser?.email === myParam || isRegistratedUser?.email === "infilya89@gmail.com";
  const disabledButton =
    currentField === "telephone" ? properPhoneLength : currentValue.length <= 1;
  if (userInfo === undefined || userInfo === null) return;
  const id = `${userInfo?.firstName} ${userInfo?.lastName}, ${userInfo.team}`;

  console.log(userInfo.photo);
  return (
    <SectionWrapper>
      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        <h2>
          {userInfo?.firstName} {userInfo?.lastName}
        </h2>
        <div className="playerInfo-wrapper">
          <div className="player-photo-wrapper">
            {userInfo.photo && (
              <div className="download-button-wrapper">
                <button onClick={() => setShowDownloadBar(!showDownloadBar)}>
                  <img src={`/photos/Download.png`} />
                </button>
              </div>
            )}
            <img src={`/photos/${userInfo.photo}`} alt="" />
          </div>
          {/* Photo */}
          {showDownloadBar && (
            <Fieldset valid={styledComponentValidator(checkPhotoFormat(userInfo.photo))}>
              <legend>
                <div className="forspan">
                  <span>
                    <strong>Photo</strong>
                  </span>
                  {!userInfo.photo && <span> (required)</span>}
                  {checkPhotoFormat(userInfo.photo) && userInfo.photo && (
                    <span>(File resolution is invalid)</span>
                  )}
                </div>
              </legend>
              <input type="file" onChange={handleUserUpload} name="photo" />
              {fileUpload && (
                <button onClick={downloadNewPhoto} disabled={checkPhotoFormat(userInfo.photo)}>
                  Ok
                </button>
              )}
              <button onClick={cancelDownload}>Cancel</button>
            </Fieldset>
          )}
          {/* Birthday */}
          {currentField === "birthday" ? (
            <Fieldset valid={styledComponentValidator(!currentValue)}>
              <legend>
                <div className="forspan">
                  <span>
                    <strong>Date of Birth</strong>
                  </span>
                  {!userInfo.birthday && <span> (required)</span>}
                </div>
              </legend>
              <input
                type="date"
                onChange={handleEditField}
                value={currentValue}
                name="birthday"
                style={{ textAlign: "center" }}
                required
              />
            </Fieldset>
          ) : (
            <div className="playerInfo-fields">
              <label>Birthday:</label>
              <div>{userInfo.birthday}</div>
              {fieldAccess && (
                <div>
                  <button onClick={() => setCurrentFieldValue("birthday", userInfo.birthday)}>
                    <img src="/photos/pencil.png"></img>
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Telephone */}
          {fieldAccess && (
            <>
              {currentField === "telephone" ? (
                <Fieldset valid={styledComponentValidator(properPhoneLength)}>
                  <legend>
                    <div className="forspan">
                      <span>
                        <strong>Telephone</strong>
                      </span>
                      {properPhoneLength && <span> (required)</span>}
                    </div>
                  </legend>
                  <input
                    type="tel"
                    onChange={handlePhoneChange}
                    value={currentValue}
                    name="telephone"
                    required
                  />
                </Fieldset>
              ) : (
                <div className="playerInfo-fields">
                  <label>Phone:</label>
                  <div>{userInfo.telephone}</div>
                  <div>
                    <button onClick={() => setCurrentFieldValue("telephone", userInfo.telephone)}>
                      <img src="/photos/pencil.png"></img>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          <>
            {/* Hand */}
            {currentField === "hand" ? (
              <Fieldset valid={styledComponentValidator(!currentValue)}>
                <legend>
                  <div className="forspan">
                    <span>
                      <strong>Dominant Hand</strong>
                    </span>
                    {!userInfo.hand && <span> (required)</span>}
                  </div>
                </legend>
                <select onChange={handleEditField} name="hand" value={currentValue}>
                  <option value="">Choose hand</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="ambidextrous">Ambidextrous</option>
                </select>
              </Fieldset>
            ) : (
              <div className="playerInfo-fields">
                <label>Dominant Hand:</label>
                <div>{firstLetterCapital(userInfo?.hand)}</div>
                {fieldAccess && (
                  <div>
                    <button onClick={() => setCurrentFieldValue("hand", userInfo.hand)}>
                      <img src="/photos/pencil.png"></img>
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Height */}
            {currentField === "height" ? (
              <Fieldset valid={styledComponentValidator(!currentValue)}>
                <legend>
                  <div className="forspan">
                    <span>
                      <strong>Height</strong>
                    </span>
                    {!userInfo.height && <span> (required)</span>}
                  </div>
                </legend>
                <div className="measure-wrapper">
                  <div>
                    {currentValue} cm ; {Math.round(+currentValue / 2.54 / 1.2) / 10} ft
                  </div>
                  <input
                    type="range"
                    onChange={handleEditField}
                    value={currentValue}
                    name="height"
                    min={150}
                    max={220}
                  />
                </div>
              </Fieldset>
            ) : (
              <div className="playerInfo-fields">
                <label>Height:</label>
                <div>
                  {userInfo.height} cm ;&nbsp;{Math.round(+userInfo.height / 2.54 / 1.2) / 10} ft
                </div>
                {fieldAccess && (
                  <div>
                    <button onClick={() => setCurrentFieldValue("height", userInfo.height)}>
                      <img src="/photos/pencil.png"></img>
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Weight */}

            {currentField === "weight" ? (
              <Fieldset valid={styledComponentValidator(!currentValue)}>
                <legend>
                  <div className="forspan">
                    <span>
                      <strong>Weight</strong>
                    </span>
                    {!userInfo.weight && <span> (required)</span>}
                  </div>
                </legend>
                <div className="measure-wrapper">
                  <div>
                    {currentValue} kg ;&nbsp;{Math.round(+currentValue * 2.2)} lbs
                  </div>
                  <input
                    type="range"
                    onChange={handleEditField}
                    value={currentValue}
                    name="weight"
                    min={40}
                    max={120}
                  />
                </div>
              </Fieldset>
            ) : (
              <div className="playerInfo-fields">
                <label>Weight:</label>
                <div>
                  {userInfo.weight} kg ;&nbsp;{Math.round(+userInfo.weight * 2.2)} lbs
                </div>
                {fieldAccess && (
                  <div>
                    <button onClick={() => setCurrentFieldValue("weight", userInfo.weight)}>
                      <img src="/photos/pencil.png"></img>
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Reach Height */}
            {currentField === "reach" ? (
              <Fieldset valid={styledComponentValidator(!currentValue)}>
                <legend>
                  <div className="forspan">
                    <span>
                      <strong>Reach height</strong>
                    </span>
                    {!userInfo.reach && <span> (required)</span>}
                  </div>
                </legend>
                <div className="measure-wrapper">
                  <div>
                    {currentValue} cm ; {Math.round(+currentValue / 2.54 / 1.2) / 10} Foots
                  </div>
                  <input
                    type="range"
                    onChange={handleEditField}
                    value={currentValue}
                    name="reach"
                    min={280}
                    max={380}
                  />
                </div>
              </Fieldset>
            ) : (
              <div className="playerInfo-fields">
                <label>Reach height:</label>
                <div>
                  {userInfo.reach} cm ;&nbsp;{Math.round(+userInfo.reach / 2.54 / 1.2) / 10} ft
                </div>
                {fieldAccess && (
                  <div>
                    <button onClick={() => setCurrentFieldValue("reach", userInfo.reach)}>
                      <img src="/photos/pencil.png"></img>
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Number */}
            {currentField === "number" ? (
              <Fieldset valid={styledComponentValidator(!currentValue)}>
                <legend>
                  <div className="forspan">
                    <span>
                      <strong>Jersey number</strong>
                    </span>
                    {!userInfo.number && <span> (required)</span>}
                  </div>
                </legend>
                <div className="measure-wrapper">
                  <div># {currentValue}</div>
                  <input
                    type="range"
                    onChange={handleUserNumberChange}
                    value={currentValue}
                    min={0}
                    max={99}
                  />
                </div>
              </Fieldset>
            ) : (
              <div className="playerInfo-fields">
                <label>Jersey number:</label>
                <div>{userInfo.number}</div>
                {fieldAccess && (
                  <div>
                    <button onClick={() => setCurrentFieldValue("number", userInfo.number)}>
                      <img src="/photos/pencil.png"></img>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>

          {currentField ? (
            <div className="nav-buttons">
              <Button
                type="button"
                text="OK"
                onClick={() => setEditedProfile({ ...userInfo, [currentField]: currentValue })}
                disabled={disabledButton}
              />
              <Button type="button" text="Cancel" onClick={() => setCurrentField("")} />
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
                        <iframe
                          src={userInfo?.highlightsLink}
                          title="YouTube video player"
                          allowFullScreen
                        ></iframe>
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
                      <Button type="button" text="Confirm" onClick={confirmHighlights} />
                      <Button
                        type="button"
                        text="Cancel"
                        onClick={() => setConfirmationHighlights(false)}
                      />
                    </div>
                  ) : (
                    <>
                      {fieldAccess && (
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
              {!confirmationHighlights && (
                <div className="nav-buttons">
                  {fieldAccess && (
                    <Button type="button" text="Delete Profile" onClick={deletePlayerProfile} />
                  )}
                  <Button type="button" text="Back" onClick={() => navigate("/")} />
                </div>
              )}
            </>
          )}
        </div>
      </FormWrapper>
    </SectionWrapper>
  );
}
