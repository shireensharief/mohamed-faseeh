import { person } from "@/data/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="monogram" href="#home" aria-label="Back to top">{person.monogram}<span>·</span></a>
      <span>© {new Date().getFullYear()} {person.name}</span>
      <span>FAST SYSTEMS. CALM ON-CALL.</span>
    </footer>
  );
}
