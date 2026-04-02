import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Chatbot from "./pages/chatbot";
import VoicePractice from "./pages/voice";
import Profile from "./pages/profile";
import Chapters from "./pages/chapters";
import Tasks from "./pages/tasks";
import Progress from "./pages/progress";
import Settings from "./pages/settings";
import Language from "./pages/language";
import NotFound from "./pages/notfound";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, [location]);

  const PrivateRoute = ({ element }) =>
    isLoggedIn ? element : <Navigate to="/login" />;

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
      />

      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/chatbot" element={<PrivateRoute element={<Chatbot />} />} />
      <Route path="/voice" element={<PrivateRoute element={<VoicePractice />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/chapters" element={<PrivateRoute element={<Chapters />} />} />
      <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} />
      <Route path="/progress" element={<PrivateRoute element={<Progress />} />} />
      <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
      <Route path="/language" element={<PrivateRoute element={<Language />} />} />

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppWrapper;
