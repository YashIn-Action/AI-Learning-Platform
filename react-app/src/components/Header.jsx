import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="navbar">
        <div className="left">
          <img
            className="logo"
            src="/logo/Gemini_Generated_Image_g1j2w0g1j2w0g1j2-Photoroom.svg"
            alt="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <p
            className="title"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            LEARNEX
          </p>
        </div>

        <div className="right">
          <button
            className="login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="signup"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
