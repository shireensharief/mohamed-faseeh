import { person } from "@/data/content";
import { asset } from "@/lib/asset";
import ContactForm from "./ContactForm";
import FooterShell from "./FooterShell";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-marker">
        <span>06 — YOUR NEXT RELIABLE SYSTEM</span>
        <span>STARTS WITH A HELLO</span>
      </div>
      <h2 data-reveal>
        Let’s build{" "}<br /><em>something reliable.</em>
        {/* a cloud with the DevOps infinity loop: build, deploy, monitor, repeat */}
        <span className="contact-spark" aria-hidden="true">
          <svg viewBox="0 0 120 84" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path
              className="spark-cloud"
              strokeWidth="3.2"
              d="M30 72h62a20 20 0 0 0 2-39.9A28 28 0 0 0 40.6 22 22 22 0 0 0 30 72Z"
            />
            <path
              className="spark-loop"
              strokeWidth="3.2"
              d="M60 52c-7-7.5-11.5-12-18-12a12 12 0 0 0 0 24c6.5 0 11-4.5 18-12s11.5-12 18-12a12 12 0 0 1 0 24c-6.5 0-11-4.5-18-12Z"
            />
            <path
              className="spark-flow"
              strokeWidth="3.4"
              pathLength="100"
              d="M60 52c-7-7.5-11.5-12-18-12a12 12 0 0 0 0 24c6.5 0 11-4.5 18-12s11.5-12 18-12a12 12 0 0 1 0 24c-6.5 0-11-4.5-18-12Z"
            />
          </svg>
        </span>
      </h2>

      <div className="contact-grid">
        <div className="contact-copy">
          <p>Have a role, a flaky system, or a team that cares about uptime? Let’s talk.</p>
          <a className="email-link" href={`mailto:${person.email}`}>{person.email} ↗</a>
          <a className="phone-link" href={person.phoneHref}>{person.phone}</a>
          <span className="contact-location">{person.location}</span>
          <div className="pills">
            <a href={person.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
            <a href={asset(person.resume)} download>Résumé ↓</a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <FooterShell />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
