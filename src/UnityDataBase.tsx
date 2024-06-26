import { Route, Routes } from "react-router-dom";
import Footer from "./HMF/Footer";
import Header from "./HMF/Header";
import Main from "./HMF/Main";
import "./css/newMain.css";
import "./css/newHeader.css";
import "./css/newFooter.css";
import PlayerInfo from "./HMF/components/table components/PlayerInfo";
import { Auth } from "./HMF/components/Auth";
import AdditionalStat from "./HMF/components/table components/AdditionalStat";

export default function UnityDataBase() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <article>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Auth" element={<Auth />} />
            <Route path="/PlayerInfo" element={<PlayerInfo />} />
            <Route path="/AdditionalStat" element={<AdditionalStat />} />
          </Routes>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
