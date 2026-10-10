import { avatarLines, person } from "@/data/content";
import { asset } from "@/lib/asset";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-marker">
        <span>06 — YOUR NEXT RELIABLE SYSTEM</span>
        <span>STARTS WITH A HELLO</span>
      </div>
      <h2 data-reveal>
        Let’s build{" "}<br /><em>something reliable.</em>
        <span className="contact-spark" aria-hidden="true">✳</span>
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
          </div>
          <div className="socials">
            <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <ContactForm />
      </div>

      <details className="avatar-transcripts">
        <summary>Avatar guide transcripts</summary>
        {Object.entries(avatarLines).map(([k, v]) => (
          <p key={k}><strong>{k}: </strong>{v}</p>
        ))}
      </details>
    </section>
  );
}
