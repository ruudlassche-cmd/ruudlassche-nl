import backgroundPhoto from "../assets/ruudlassche-background.png";
import HamburgerMenu from "./HamburgerMenu.jsx";

function LandingPage() {
  return (
    <main className="landing-page">
      <HamburgerMenu />

      <img
        className="landing-photo"
        src={backgroundPhoto}
        alt="Ruud Lassche"
      />

      <div className="landing-overlay" aria-hidden="true" />

      <section className="landing-intro" aria-labelledby="landing-title">
        <p className="landing-eyebrow" id="landing-title">
          IT PROJECT MANAGER
        </p>

        <p className="landing-lead">
          Ik breng mensen, technologie en resultaat bij elkaar.
        </p>

        <p>
          Als IT Project Manager neem ik de regie over complexe projecten met
          meerdere teams, leveranciers en afhankelijkheden. Ik creëer
          overzicht, bewaak planning, budget en risico&rsquo;s en zorg voor
          heldere communicatie op ieder niveau.
        </p>

        <p>
          Van strategie en voorbereiding tot implementatie en oplevering: ik
          zorg dat een project niet alleen wordt gepland, maar ook
          daadwerkelijk wordt gerealiseerd.
        </p>

        <p className="landing-tagline">
          Rust in de complexiteit. Grip op het resultaat.
        </p>
      </section>
    </main>
  );
}

export default LandingPage;
