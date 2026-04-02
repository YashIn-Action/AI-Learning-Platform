import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./chapters.css";

const LANGUAGES = [
  { code: "English", flag: "🇬🇧", native: "English" },
  { code: "Spanish", flag: "🇪🇸", native: "Español" },
  { code: "French", flag: "🇫🇷", native: "Français" },
  { code: "German", flag: "🇩🇪", native: "Deutsch" },
  { code: "Japanese", flag: "🇯🇵", native: "日本語" },
  { code: "Italian", flag: "🇮🇹", native: "Italiano" },
  { code: "Portuguese", flag: "🇧🇷", native: "Português" },
  { code: "Korean", flag: "🇰🇷", native: "한국어" },
  { code: "Chinese", flag: "🇨🇳", native: "中文" },
  { code: "Arabic", flag: "🇸🇦", native: "العربية" },
];

function Language() {
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );
  const [saved, setSaved] = useState(false);

  const handleSelect = (code) => {
    setSelected(code);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("selectedLanguage", selected);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="inner-page">
        <div className="inner-header">
          <h1>🌍 Language</h1>
        </div>

        <p style={{ color: "#888", marginBottom: "20px" }}>
          Choose the language you want to learn. Your progress is tracked per language.
        </p>

        <div className="lang-grid">
          {LANGUAGES.map((l) => (
            <div
              key={l.code}
              className={`lang-card ${selected === l.code ? "lang-selected" : ""}`}
              onClick={() => handleSelect(l.code)}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-name">{l.code}</span>
              <span className="lang-native">{l.native}</span>
              {selected === l.code && <span className="lang-tick">✓</span>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "28px", textAlign: "center" }}>
          <button className="save-btn" onClick={handleSave}>
            {saved ? "✅ Saved!" : "Save Language"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Language;