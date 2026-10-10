"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

// Same EmailJS account and template as the previous portfolio. The template
// expects {name, email, message}; the optional phone rides along in message.
const SERVICE_ID = "service_7drbflu";
const TEMPLATE_ID = "template_22d21qb";
const PUBLIC_KEY = "w6igX2W8URRAE7MXn";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity() || status === "sending") return;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // bot filled the hidden field

    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "");
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          message: phone ? `${message}\n\nPhone: ${phone}` : message,
        },
        PUBLIC_KEY,
      );
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const text =
    status === "success" ? "Thanks! Your message is on its way." :
    status === "error" ? "Something went wrong. Please email me directly." : "";

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <label htmlFor="name">
          Your name
          <input id="name" name="name" required autoComplete="name" placeholder="How should I call you?" />
        </label>
        <label htmlFor="email">
          Email address
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </label>
      </div>
      <label htmlFor="phone">
        Phone <span>(optional)</span>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" />
      </label>
      <label htmlFor="message">
        What do you have in mind?
        <textarea id="message" name="message" required placeholder="A role, a system to stabilise, a pipeline to build…" />
      </label>
      <label className="sr-only" aria-hidden="true">
        Leave this empty<input tabIndex={-1} autoComplete="off" name="_gotcha" />
      </label>
      <button className="button primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
      </button>
      <p
        className={`form-status ${status}`}
        role="status"
        style={{ opacity: text ? 1 : 0, transform: text ? "none" : "translateY(5px)" }}
      >
        {text}
      </p>
    </form>
  );
}
