import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./chapters.css";

function NotFound() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="inner-page" style={{ textAlign: "center", paddingTop: "80px", minHeight: "60vh" }}>
                <div style={{ fontSize: "5rem" }}>🔍</div>
                <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#1a1a2e", margin: "16px 0 8px" }}>
                    404
                </h1>
                <p style={{ color: "#888", fontSize: "1.1rem", marginBottom: "32px" }}>
                    Oops! This page doesn't exist.
                </p>
                <button className="save-btn" onClick={() => navigate("/")}>
                    ← Go Home
                </button>
            </div>
            <Footer />
        </>
    );
}

export default NotFound;
