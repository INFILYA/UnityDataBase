import styled from "styled-components";

type TFieldset = {
  valid: string;
};

export const Fieldset = styled.fieldset<TFieldset>`
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background-color: ${(props) => (props.valid === "true" ? "#FFE8F2" : "aliceblue")};
  border: ${(props) => (props.valid === "true" ? "1px solid orangered" : "aliceblue")};
`;

export const Section = styled.section`
  display: flex;
  position: relative;
  box-sizing: border-box;
  z-index: 0;
  min-width: 325px;
  width: 100%;
`;

export const SectionBorder = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

export const SectionBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  padding: 2vmax;
  z-index: 4;
  width: 100%;
  box-sizing: content-box;
  margin: 0 auto;
  display: flex;
`;
export const Content = styled.div`
  width: 100%;
`;
