import "./App.css";

import { useAuth } from "./auth/useAuth.js";
import LoginPage from "./components/LoginPage.jsx";
import LandingPage from "./components/LandingPage.jsx";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <main className="loading-screen" aria-busy="true" />;
  }

  return isAuthenticated ? <LandingPage /> : <LoginPage />;
}

export default App;
