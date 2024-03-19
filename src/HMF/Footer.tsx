import MyLogo from "../utilities/MyLogo";
import SectionWrapper from "../wpappers/SectionWrapper";

export default function Footer() {
  return (
    <footer>
      <SectionWrapper>
        <div className="footer-content">
          <div className="footer-image-block">
            <MyLogo />
            <img alt="" src="/photos/UnityLogoCuted.png" />
            <img alt="" src="/photos/OVALogo.png" />
            <img alt="" src="/photos/VolleyballCanada_Logo.png" />
          </div>
          <div className="footer-info-block">
            <div className="footer-my-info">
              <div>
                <h2>Philip Harmash</h2>
              </div>
              <div>
                <strong>
                  <a href="mailto:infilya89@gmail.com">infilya89@gmail.com</a>
                </strong>
              </div>
              <div style={{ marginTop: 10 }}>
                <a href="tel:+16479206896">(647)-920 6896</a>
              </div>
            </div>
            <div className="footer-club-info">
              <div>
                <h2>Unity Contact</h2>
              </div>
              <div>
                <strong>
                  <a href="mailto:admin@unitysports.ca">admin@unitysports.ca</a>
                </strong>
              </div>
              <div style={{ marginTop: 10 }}>
                <a href="tel:+14169856959">(416)-985 6959</a>
              </div>
            </div>
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
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
