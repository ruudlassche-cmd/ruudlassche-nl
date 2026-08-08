import { useState } from "react";

import { useAuth } from "../auth/useAuth.js";

function ResetPasswordPage() {
  const { updatePassword, error, clearError } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 8 || mismatch) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await updatePassword(password);
      if (result.success) {
        setDone(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-background" aria-hidden="true" />
      <div className="auth-overlay" aria-hidden="true" />

      <section className="auth-card" aria-labelledby="reset-title">
        <div className="auth-brand">
          <div className="auth-brand-mark" aria-hidden="true">
            R
          </div>

          <div>
            <p className="auth-eyebrow">Persoonlijk portaal</p>
            <h1 id="reset-title">Nieuw wachtwoord</h1>
          </div>
        </div>

        {done ? (
          <p className="auth-introduction">
            Je wachtwoord is ingesteld. Je bent nu ingelogd.
          </p>
        ) : (
          <>
            <p className="auth-introduction">
              Kies een nieuw wachtwoord (minimaal 8 tekens) voor je account.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Nieuw wachtwoord</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (error) {
                      clearError();
                    }
                  }}
                  autoComplete="new-password"
                  autoFocus
                  required
                  minLength={8}
                  disabled={submitting}
                  placeholder="Minimaal 8 tekens"
                />
              </label>

              <label className="auth-field">
                <span>Bevestig wachtwoord</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                  required
                  disabled={submitting}
                  placeholder="Herhaal het wachtwoord"
                />
              </label>

              {mismatch && (
                <div className="auth-error" role="alert">
                  De wachtwoorden komen niet overeen.
                </div>
              )}

              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-button"
                disabled={submitting || password.length < 8 || mismatch}
              >
                {submitting ? "Bezig..." : "Wachtwoord instellen"}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

export default ResetPasswordPage;
