import "./App.css";

import { useAuth } from "./auth/useAuth.js";
import LoginPage from "./components/LoginPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ResetPasswordPage from "./components/ResetPasswordPage.jsx";

function App() {
  const { isAuthenticated, loading, passwordRecovery } = useAuth();

  if (loading) {
    return <main className="loading-screen" aria-busy="true" />;
  }

  if (passwordRecovery) {
    return <ResetPasswordPage />;
  }

  return isAuthenticated ? <LandingPage /> : <LoginPage />;
}

export default App;
