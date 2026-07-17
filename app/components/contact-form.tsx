"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

const friendlyFailure = "We could not send your inquiry right now. Please try again shortly.";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef<number | null>(null);
  const submissionInFlight = useRef(false);
  const successPanel = useRef<HTMLDivElement>(null);
  const errorMessage = useRef<HTMLParagraphElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state === "success") successPanel.current?.focus();
    if (state === "error") errorMessage.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (submissionInFlight.current) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submissionInFlight.current = true;
    setState("sending");
    setError("");
    const values = Object.fromEntries(new FormData(form).entries());
    let delivered = false;

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

      const result: unknown = response.ok ? await response.json().catch(() => null) : null;
      const accepted = Boolean(
        result &&
          typeof result === "object" &&
          "success" in result &&
          result.success === true,
      );

      if (!response.ok || !accepted) {
        if (process.env.NODE_ENV === "development") {
          console.info("AVELUNE inquiry submission did not succeed", { status: response.status });
        }
        throw new Error(friendlyFailure);
      }

      form.reset();
      delivered = true;
      setState("success");
    } catch {
      if (process.env.NODE_ENV === "development") {
        console.info("AVELUNE inquiry submission failed");
      }
      setError(friendlyFailure);
      setState("error");
    } finally {
      if (!delivered) submissionInFlight.current = false;
    }
  }

  function sendAnotherInquiry() {
    submissionInFlight.current = false;
    startedAt.current = Date.now();
    setError("");
    setState("idle");
    requestAnimationFrame(() => firstField.current?.focus());
  }

  if (state === "success") {
    return (
      <div className="form-success" ref={successPanel} role="status" tabIndex={-1} aria-live="polite" aria-atomic="true">
        <p className="eyebrow">Inquiry Sent</p>
        <h2>Thank you for sharing your story.</h2>
        <p>We&apos;ve safely received your inquiry.</p>
        <p>Our team will personally review your request and reply within 24 hours.</p>
        <p>If your request includes a custom portrait, we&apos;ll guide you through the next step by email.</p>
        <button className="button" type="button" onClick={sendAnotherInquiry}>Send another inquiry</button>
      </div>
    );
  }

  const isSending = state === "sending";

  return (
    <form className="inquiry-form" onSubmit={submit} aria-busy={isSending}>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <label>Full name<input ref={firstField} name="name" required autoComplete="name" disabled={isSending} /></label>
        <label>Email<input type="email" name="email" required autoComplete="email" disabled={isSending} /></label>
        <label>Country<input name="country" required autoComplete="country-name" disabled={isSending} /></label>
        <label>Pet name<input name="petName" disabled={isSending} /></label>
        <label>Pet type<input name="petType" placeholder="For example, dog or cat" disabled={isSending} /></label>
        <label>
          Personalization request
          <select name="personalisation" defaultValue="" disabled={isSending}>
            <option value="" disabled>Select an option</option>
            <option>Portrait, name and dates</option>
            <option>Portrait, name, dates and short message</option>
            <option>I would like guidance</option>
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows={6} required placeholder="Tell us a little about the keepsake you have in mind." disabled={isSending} />
      </label>
      <label className="upload-field">
        Pet photo <span>Photo upload will be requested after we reply to your inquiry.</span>
        <input type="file" accept="image/*" disabled />
      </label>
      <p className="submission-status" aria-live="polite" aria-atomic="true">
        {isSending && <><span className="loading-indicator" aria-hidden="true" />Sending...</>}
      </p>
      {state === "error" && <p className="form-error" ref={errorMessage} role="alert" tabIndex={-1}>{error}</p>}
      <button className="button" type="submit" disabled={isSending} aria-busy={isSending}>
        {isSending ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
