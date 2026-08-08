# Ruud Lassche — Portaal

Persoonlijk portaal (www.ruudlassche.nl): login, landingspagina en hamburgermenu naar LAIA, LVA en RLPM.

Fase 0 van het RLPM-traject (zie `../PLAN.md`). Puur een startmenu — de apps zelf blijven zelfstandig gedeployed.

## Stack

Vite + React 19 + Supabase Auth (zelfde Supabase-project als LAIA, voor single sign-on).

## Ontwikkelen

```bash
npm install
npm run dev
```

Kopieer `.env.example` naar `.env.local` en vul de Supabase-gegevens en app-URL's in.

## Environment variabelen

- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` — zelfde Supabase-project als LAIA.
- `VITE_LAIA_URL`, `VITE_LVA_URL`, `VITE_RLPM_URL` — doorlinks in het hamburgermenu. Leeg = toont "binnenkort".
