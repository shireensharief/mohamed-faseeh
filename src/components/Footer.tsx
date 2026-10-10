import { person } from "@/data/content";
import { asset } from "@/lib/asset";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="monogram" href="#home" aria-label="Back to top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/logo.webp")} alt="" width={37} height={37} />
      </a>
      <span>© {new Date().getFullYear()} {person.name}</span>
      <span>FAST SYSTEMS. CALM ON-CALL.</span>
    </footer>
  );
}
