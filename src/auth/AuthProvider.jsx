import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { supabase } from "../lib/supabaseClient.js";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!mounted) {
          return;
        }

        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      } catch (sessionLoadError) {
        if (!mounted) {
          return;
        }

        console.error("Supabase sessie kon niet worden geladen:", sessionLoadError);
        setError("De bestaande sessie kon niet worden gecontroleerd.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!mounted) {
        return;
      }

      if (event === "PASSWORD_RECOVERY") {
        setPasswordRecovery(true);
      }

      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setLoading(false);
      setError("");
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (signInError) {
      console.error("Inloggen mislukt:", signInError);
      setError("Het e-mailadres of wachtwoord is niet juist.");
      return { success: false, error: signInError };
    }

    setSession(data.session ?? null);
    setUser(data.user ?? null);

    return { success: true, error: null };
  }, []);

  const signOut = useCallback(async () => {
    setError("");

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      console.error("Uitloggen mislukt:", signOutError);
      setError("Uitloggen is niet gelukt. Probeer het opnieuw.");
      return { success: false, error: signOutError };
    }

    setSession(null);
    setUser(null);

    return { success: true, error: null };
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const updatePassword = useCallback(async (newPassword) => {
    setError("");

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      console.error("Wachtwoord instellen mislukt:", updateError);
      setError("Het wachtwoord kon niet worden ingesteld. Probeer het opnieuw.");
      return { success: false, error: updateError };
    }

    setPasswordRecovery(false);

    return { success: true, error: null };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      error,
      passwordRecovery,
      isAuthenticated: Boolean(session && user),
      signIn,
      signOut,
      clearError,
      updatePassword,
    }),
    [
      session,
      user,
      loading,
      error,
      passwordRecovery,
      signIn,
      signOut,
      clearError,
      updatePassword,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
