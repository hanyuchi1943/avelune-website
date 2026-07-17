"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setState("sending");
    setError("");
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt: startedAt.current ?? Date.now(),
          pageUrl: window.location.href,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setState("success");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "We could not send your inquiry right now. Please try again or contact us directly by email.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <p className="eyebrow">Inquiry received</p>
        <h2>Thank you for sharing your story.</h2>
        <p>We&apos;ve safely received your inquiry.</p>
        <p>Our team will personally review your request and reply within 24 hours.</p>
        <p>If your request includes a custom portrait, we&apos;ll guide you through the next step by email.</p>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <label>Full name<input name="name" required autoComplete="name" disabled={state === "sending"} /></label>
        <label>Email<input type="email" name="email" required autoComplete="email" disabled={state === "sending"} /></label>
        <label>Country<input name="country" required autoComplete="country-name" disabled={state === "sending"} /></label>
        <label>Pet name<input name="petName" disabled={state === "sending"} /></label>
        <label>Pet type<input name="petType" placeholder="For example, dog or cat" disabled={state === "sending"} /></label>
        <label>
          Personalization request
          <select name="personalisation" defaultValue="" disabled={state === "sending"}>
            <option value="" disabled>Select an option</option>
            <option>Portrait, name and dates</option>
            <option>Portrait, name, dates and short message</option>
            <option>I would like guidance</option>
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows={6} required placeholder="Tell us a little about the keepsake you have in mind." disabled={state === "sending"} />
      </label>
      <label className="upload-field">
        Pet photo <span>Photo upload will be requested after we reply to your inquiry.</span>
        <input type="file" accept="image/*" disabled />
      </label>
      {state === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending inquiry…" : "Submit inquiry"} <span>↗</span>
      </button>
    </form>
  );
}
