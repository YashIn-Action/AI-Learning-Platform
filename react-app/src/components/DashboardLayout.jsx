import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";

function DashboardLayout({ children }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = localStorage.getItem("userName") || "User";

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        navigate("/login");
    };

    const nav = (path) => {
        setOpen(false);
        navigate(path);
    };

    const menuItems = [
        { label: "Dashboard", path: "/dashboard", icon: "🏠" },
        { label: "Chapters", path: "/chapters", icon: "📚" },
        { label: "Tasks", path: "/tasks", icon: "✅" },
        { label: "Progress", path: "/progress", icon: "📊" },
        { label: "Voice", path: "/voice", icon: "🎤" },
        { label: "AI Tutor", path: "/chatbot", icon: "🤖" },
        { label: "Language", path: "/language", icon: "🌍" },
        { label: "Profile", path: "/profile", icon: "👤" },
        { label: "Settings", path: "/settings", icon: "⚙️" },
    ];

    return (
        <div className="layout">
            {/* Navbar */}
            <div className="navbar">
                <div className="nav-left">
                    <div className="hamburger" onClick={() => setOpen(!open)}>☰</div>
                    <span className="logo-text" onClick={() => nav("/dashboard")} style={{ cursor: "pointer" }}>
                        LEARNEX
                    </span>
                </div>
                <div className="nav-right">
                    <div className="avatar">{user.charAt(0).toUpperCase()}</div>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${open ? "active" : ""}`}>
                <div className="sidebar-header"><h3>Menu</h3></div>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            className={location.pathname === item.path ? "active" : ""}
                            onClick={() => nav(item.path)}
                        >
                            <span style={{ marginRight: "8px" }}>{item.icon}</span>
                            {item.label}
                        </li>
                    ))}
                    <li className="logout-item" onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
                        🚪 Logout
                    </li>
                </ul>
            </div>

            {open && <div className="backdrop" onClick={() => setOpen(false)} />}

            {/* Page content */}
            <div className="main">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
