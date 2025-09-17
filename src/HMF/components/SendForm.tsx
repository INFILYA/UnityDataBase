import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SectionWrapper from "../../wpappers/SectionWrapper";
import { TUserInfo } from "../../types/Types";
import Button from "../../utilities/Button";
import { Fieldset } from "../../css/UnityDataBase.styled";
import { auth, storage, playersRef } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../../states/store";
import { setPlayers } from "../../states/slices/playersSlice";
import { styledComponentValidator } from "../../utilities/functions";
import { onValue, set } from "firebase/database";
import FormWrapper from "../../wpappers/FormWrapper";
import FormFields from "./fields/FormFields";

export default function SendForm() {
  const [isRegistratedUser] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coachAcces, setCoachAcces] = useState<boolean>(false);
  const [coachPassword, setCoachPassword] = useState<string>("");
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    firstName: "",
    lastName: "",
    email: isRegistratedUser?.email,
    gender: "",
    team: "",
    position: "",
    telephone: "",
    birthday: "",
    height: "00",
    number: "00",
    standingVerticalJump: "00",
    approachingVerticalJump: "00",
    twentyMeterSprint: "00",
    fourOnNineRun: "00",
    pushUpsFromKnees: "00",
    pullUpsOnLowBar: "00",
    overheadMedicineBallThrow: "00",
    plank: "00",
    apleyScratch: "00",
    kneeToWall: "00",
    sitAndReach: "00",
    shoulderFlexion: "00",
    seatedTrunk: "00",
    butterfly: "00",
    photo: "none",
    highlights: false,
    // evaluation: {
    //   anthropometry: false,
    //   agility: false,
    //   criticalThinking: false,
    //   softSkills: false,
    // },
  });

  useEffect(() => {
    async function getData() {
      try {
        if (isRegistratedUser) {
          onValue(playersRef(""), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
              dispatch(setPlayers(Object.values(data) as TUserInfo[]));
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [dispatch, isRegistratedUser]);

  // Save data
  const submitUserInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, email: isRegistratedUser!.email });
    try {
      setIsLoading(!isLoading);
      //Збрігаю гравця
      const id = `${userInfo?.firstName} ${userInfo?.lastName}, ${userInfo.team}`;
      await set(playersRef(id), userInfo);
      if (!fileUpload) return;
      const filesFoldersRef = ref(
        storage,
        `playersPhotos/${id}/${fileUpload.name}`
      );
      await uploadBytes(filesFoldersRef, fileUpload);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading((prev) => !prev);
    }
  };

  function handleUserChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (
      (e.target.name === "position" && e.target.value === "") ||
      e.target.value === "COACH"
    ) {
      setUserInfo({
        ...userInfo,
        position: "",
        team: "",
        gender: "",
      });
      if (e.target.value === "COACH") {
        setCoachPassword("");
        setInvalidPassword(false);
        setCoachAcces(true);
      } else setCoachAcces(false);
    } else {
      setCoachAcces(false);
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }

    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;
    setFileUpload(files[0]);
  }

  // function handleUserNumberChange(e: ChangeEvent<HTMLInputElement>) {
  //   if (e.target.value.length === 1) {
  //     const value = `0${e.target.value}`;
  //     setUserInfo({
  //       ...userInfo,
  //       number: value,
  //     });
  //   } else
  //     setUserInfo({
  //       ...userInfo,
  //       number: e.target.value,
  //     });
  // }

  function handleUserTeamCancel() {
    setUserInfo({ ...userInfo, team: "" });
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputNumber = e.target.value.replace(/\D/g, "");
    inputNumber = inputNumber.substring(0, 10);
    if (inputNumber.length > 3) {
      inputNumber =
        inputNumber.substring(0, 3) + "-" + inputNumber.substring(3);
    }
    if (inputNumber.length > 7) {
      inputNumber =
        inputNumber.substring(0, 7) + "-" + inputNumber.substring(7);
    }
    setUserInfo({ ...userInfo, [e.target.name]: inputNumber });
  };

  const checkCoachPassword = () => {
    if (coachPassword === "zMfvS-2cp@d") {
      setUserInfo({
        ...userInfo,
        position: "COACH",
      });
      setCoachAcces(false);
    } else setInvalidPassword(true);
  };
  const userInfoValues = Object.values(userInfo).filter(
    (field) => typeof field === "string"
  );
  const isEmptyFields = userInfoValues.some(
    (field) =>
      field!.valueOf() === "" || (typeof field === "string" && field.length < 2)
  );

  const properPhoneLength = userInfo.telephone.length !== 12;
  const disabledButton = isEmptyFields || properPhoneLength;
  console.log(userInfo);
  return (
    <SectionWrapper>
      <FormWrapper onSubmit={submitUserInfo}>
        <h2>Unity Member Form</h2>
        <div className="sendForm-wrapper">
          {/* Name  */}
          <FormFields
            access={userInfo.firstName.length <= 1}
            field="firstName"
            type="text"
            value={userInfo.firstName.replace(/[^a-zA-Zа-яА-Я]/g, "")}
            onChange={handleUserChange}
          />
          {/* Surname */}
          <FormFields
            access={userInfo.lastName.length <= 1}
            field="lastName"
            type="text"
            value={userInfo.lastName.replace(/[^a-zA-Zа-яА-Я]/g, "")}
            onChange={handleUserChange}
          />
          {/* Telephone */}
          <FormFields
            access={properPhoneLength}
            field="telephone"
            type="tel"
            value={userInfo.telephone}
            onChange={handlePhoneChange}
          />
          {/* Birthday */}
          <FormFields
            access={!userInfo.birthday}
            field="birthday"
            type="date"
            value={userInfo.birthday}
            onChange={handleUserChange}
          />
          {/* Position */}
          <Fieldset valid={styledComponentValidator(!userInfo.position)}>
            <legend>
              <div className="forspan">
                <span>
                  <strong>Position</strong>
                </span>
                {!userInfo.position && <span> (required)</span>}
              </div>
            </legend>
            <div className="measure-wrapper">
              <select onChange={handleUserChange} name="position">
                <option value="">Choose position</option>
                <option value="OH">Outside Hitter</option>
                <option value="OPP">Opposite</option>
                <option value="SET">Setter</option>
                <option value="LIB">Libero</option>
                <option value="MB">Middle Blocker</option>
                <option value="COACH">Coach</option>
              </select>
            </div>
          </Fieldset>
          {/* Acces to Position coach */}
          {coachAcces && (
            <Fieldset valid={styledComponentValidator(invalidPassword)}>
              <legend>
                <div className="forspan">
                  <span>
                    <strong>Enter the Password</strong>
                  </span>
                  {invalidPassword && <span> (invalid)</span>}
                </div>
              </legend>
              <div className="measure-wrapper" style={{ flexDirection: "row" }}>
                <input
                  type="text"
                  onChange={(e) => setCoachPassword(e.target.value)}
                  value={coachPassword}
                />
                <Button
                  type="button"
                  text="OK"
                  onClick={checkCoachPassword}
                  style={{ marginLeft: 10 }}
                />
              </div>
            </Fieldset>
          )}
          {/* Gender*/}
          {userInfo.position && !coachAcces && (
            <>
              <Fieldset valid={styledComponentValidator(!userInfo.gender)}>
                <legend>
                  <div className="forspan">
                    <span>
                      <strong>
                        {userInfo.position === "COACH"
                          ? "Your team gender"
                          : "Your gender"}
                      </strong>
                    </span>
                    {!userInfo.gender && <span> (required)</span>}
                  </div>
                </legend>
                <div className="measure-wrapper">
                  <select onChange={handleUserChange} name="gender">
                    <option value="" onClick={handleUserTeamCancel}>
                      Choose your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </Fieldset>
              {/* Belongs to team */}
              {userInfo.gender && (
                <Fieldset valid={styledComponentValidator(!userInfo.team)}>
                  <legend>
                    <div className="forspan">
                      <span>
                        <strong>Team</strong>
                      </span>
                      {!userInfo.team && <span> (required)</span>}
                    </div>
                  </legend>
                  <div className="measure-wrapper">
                    <select onChange={handleUserChange} name="team">
                      <option value="">Choose your team</option>
                      {userInfo.gender === "female" ? (
                        <>
                          <option value="U-13 Girls">U-13 Girls</option>
                          <option value="U-14 Girls">U-14 Girls</option>
                          <option value="U-15 Girls">U-15 Girls</option>
                          <option value="U-16 Girls">U-16 Girls</option>
                          <option value="U-17 Girls">U-17 Girls</option>
                        </>
                      ) : (
                        <>
                          <option value="U-14 Boys">U-14 Boys</option>
                          <option value="U-15 Boys">U-15 Boys</option>
                          <option value="U-16 Boys">U-16 Boys</option>
                          <option value="U-17 Boys">U-17 Boys</option>
                          <option value="U-18 Boys">U-18 Boys</option>
                        </>
                      )}
                    </select>
                  </div>
                </Fieldset>
              )}
            </>
          )}
          {/* {userInfo.position && ( */}
          <>
            {/* Height */}
            {/* <FormFields
                access={!userInfo.height}
                field="height"
                type="range"
                value={userInfo.height}
                onChange={handleUserChange}
                measureValue={userInfo.height}
                min={150}
                max={220}
              /> */}
            {/* Number */}
            {/* <FormFields
                access={!userInfo.number}
                field="number"
                type="range"
                value={userInfo.number}
                onChange={handleUserNumberChange}
                measureValue={`# ${userInfo.number}`}
                min={0}
                max={99}
              /> */}
            {/* Reach Height */}
            {/* <FormFields
                access={!userInfo.standingVerticalJump}
                field="standingVerticalJump"
                type="range"
                value={userInfo.standingVerticalJump}
                onChange={handleUserChange}
                measureValue={userInfo.standingVerticalJump}
                min={200}
                max={380}
              /> */}
          </>
          {/* )} */}
          {/* Photo
          <FormFields
            access={checkPhotoFormat(fileUpload?.name)}
            field="photo"
            type="file"
            onChange={handleUserChange}
          /> */}
        </div>
        <div className="form-button-wrapper">
          <Button text="Submit" type="submit" disabled={disabledButton} />
        </div>
      </FormWrapper>
    </SectionWrapper>
  );
}
