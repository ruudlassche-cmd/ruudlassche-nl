import { useState } from "react";

import { useAuth } from "../auth/useAuth.js";

const APPS = [
  { key: "laia", label: "LAIA", url: import.meta.env.VITE_LAIA_URL },
  { key: "lva", label: "LVA", url: import.meta.env.VITE_LVA_URL },
  { key: "rlpm", label: "RLPM", url: import.meta.env.VITE_RLPM_URL },
];

function HamburgerMenu() {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="menu-overlay" onClick={() => setOpen(false)}>
          <nav
            className="menu-panel"
            aria-label="Hoofdmenu"
            onClick={(event) => event.stopPropagation()}
          >
            <ul>
              {APPS.map((app) => (
                <li key={app.key}>
                  {app.url ? (
                    <a href={app.url}>{app.label}</a>
                  ) : (
                    <span className="menu-item-disabled">
                      {app.label} <em>(binnenkort)</em>
                    </span>
                  )}
                </li>
              ))}

              <li>
                <span className="menu-item-disabled">
                  Instellingen <em>(binnenkort)</em>
                </span>
              </li>
            </ul>

            <button type="button" className="menu-signout" onClick={signOut}>
              Uitloggen
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
