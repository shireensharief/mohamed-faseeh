import { person } from "@/data/content";
import { asset } from "@/lib/asset";
import StatusDot from "./StatusDot";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="monogram" href="#home" aria-label="Back to top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/logo.webp")} alt="" width={37} height={37} />
      </a>
      <div className="footer-center">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span className="footer-divider" aria-hidden="true" />
        <StatusDot />
      </div>
      <span className="footer-tagline">FAST SYSTEMS. CALM ON-CALL.</span>
    </footer>
  );
}
