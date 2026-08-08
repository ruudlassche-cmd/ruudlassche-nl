import { useEffect, useState } from "react";

import { useAuth } from "../auth/useAuth.js";

function LoginPage() {
  const { signIn, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    clearError();
  }, [clearError]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      return;
    }

    setSubmitting(true);

    try {
      await signIn({ email, password });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-background" aria-hidden="true" />
      <div className="auth-overlay" aria-hidden="true" />

      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-brand">
          <div className="auth-brand-mark" aria-hidden="true">
            R
          </div>

          <div>
            <p className="auth-eyebrow">Persoonlijk portaal</p>
            <h1 id="login-title">Welkom terug</h1>
          </div>
        </div>

        <p className="auth-introduction">
          Log in om toegang te krijgen tot LAIA, LVA en RLPM.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>E-mailadres</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) {
                  clearError();
                }
              }}
              autoComplete="email"
              autoFocus
              required
              disabled={submitting}
              placeholder="jouw@email.nl"
            />
          </label>

          <label className="auth-field">
            <span>Wachtwoord</span>
            <div className="auth-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) {
                    clearError();
                  }
                }}
                autoComplete="current-password"
                required
                disabled={submitting}
                placeholder="Voer je wachtwoord in"
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                disabled={submitting}
                aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
              >
                {showPassword ? "Verberg" : "Toon"}
              </button>
            </div>
          </label>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={submitting || !email.trim() || !password}
          >
            {submitting ? "Bezig met inloggen..." : "Inloggen"}
          </button>
        </form>

        <div className="auth-security-note">
          <span aria-hidden="true">🔒</span>
          <p>Deze omgeving is uitsluitend bestemd voor privégebruik.</p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
