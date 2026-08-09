"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Alert, Check } from "@/components/ui/Icons";
import { budgetOptions, contact, serviceOptions } from "@/data/site";
import {
  contactFieldLabels,
  emptyContactValues,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/data/contact-schema";

/**
 * Contact form.
 *
 * Validation runs on submit, then per-field on change once a field has already
 * errored — so nothing shouts at someone mid-typing, but a corrected field
 * clears immediately.
 *
 * Accessibility: every control has a real <label>, errors are tied to their
 * input with aria-describedby and aria-invalid, the first invalid field takes
 * focus on a failed submit, and the result panel is a live region so a screen
 * reader hears the outcome without moving focus.
 *
 * ── Honesty ──────────────────────────────────────────────────────────────────
 * The API route only delivers when the deployment has an email provider
 * configured, and it reports which happened. The panel below reads that flag
 * rather than assuming: when nothing was delivered it says so plainly and
 * offers a mailto: link pre-filled with what the visitor already typed, so the
 * work of writing it isn't lost. Nobody walks away thinking they contacted the
 * studio when they did not.
 */

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "error"; message: string }
  | { status: "done"; delivered: boolean; message: string; sent: ContactValues };

/**
 * `className` carries the form's outer spacing. On the homepage it sits under a
 * section head and needs the gap; on /contact it is the first thing in its
 * section and does not. Both the form and the post-submit panel take it, so the
 * two states never sit at different heights.
 */
export function ContactForm({ className = "mt-10 lg:mt-0" }: { className?: string }) {
  const formId = useId();
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (field: ContactField) => `${formId}-${field}`;
  const errorId = (field: ContactField) => `${formId}-${field}-error`;

  function update(field: ContactField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: event.target.value };
      setValues(next);
      // Only re-validate a field that is already showing an error.
      if (errors[field]) {
        const fresh = validateContact(next);
        setErrors((prev) => ({ ...prev, [field]: fresh[field] }));
      }
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0] as ContactField | undefined;
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    setState({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data?.errors) setErrors(data.errors as ContactErrors);
        setState({
          status: "error",
          message: data?.message ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setState({
        status: "done",
        delivered: Boolean(data.delivered),
        message: data.message,
        // Kept so the mailto: fallback can carry the visitor's own words.
        sent: values,
      });
      setValues(emptyContactValues);
    } catch {
      setState({
        status: "error",
        message: "We could not reach the server. Please check your connection and try again.",
      });
    }
  }

  if (state.status === "done") {
    return (
      <ResultPanel
        state={state}
        className={className}
        onReset={() => setState({ status: "idle" })}
      />
    );
  }

  const isSending = state.status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={className}>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Field
          label="Name"
          id={fieldId("name")}
          errorId={errorId("name")}
          error={errors.name}
          required
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            className="input"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
            required
          />
        </Field>

        <Field
          label="Email"
          id={fieldId("email")}
          errorId={errorId("email")}
          error={errors.email}
          required
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="input"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            required
          />
        </Field>

        <Field label="Phone" id={fieldId("phone")} errorId={errorId("phone")} error={errors.phone}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="input"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
          />
        </Field>

        <Field
          label="Company"
          id={fieldId("company")}
          errorId={errorId("company")}
          error={errors.company}
        >
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            className="input"
            value={values.company}
            onChange={update("company")}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? errorId("company") : undefined}
          />
        </Field>

        <Field
          label="Service"
          id={fieldId("service")}
          errorId={errorId("service")}
          error={errors.service}
        >
          <select
            id={fieldId("service")}
            name="service"
            className="input"
            value={values.service}
            onChange={update("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? errorId("service") : undefined}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Budget"
          id={fieldId("budget")}
          errorId={errorId("budget")}
          error={errors.budget}
        >
          <select
            id={fieldId("budget")}
            name="budget"
            className="input"
            value={values.budget}
            onChange={update("budget")}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? errorId("budget") : undefined}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Project details"
            id={fieldId("details")}
            errorId={errorId("details")}
            error={errors.details}
            required
          >
            <textarea
              id={fieldId("details")}
              name="details"
              rows={5}
              className="input resize-y"
              placeholder="What are you building, what are you trying to achieve, and where do you need help?"
              value={values.details}
              onChange={update("details")}
              aria-invalid={Boolean(errors.details)}
              aria-describedby={errors.details ? errorId("details") : undefined}
              required
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" arrow disabled={isSending} data-cta="contact-submit">
          {isSending ? "Sending…" : "Send Inquiry"}
        </Button>

        <p className="label-sm max-w-xs leading-relaxed text-ink-3">
          <span className="normal-case tracking-normal">
            We reply within one business day. Your details are used only to answer this enquiry.
          </span>
        </p>
      </div>

      {/* Errors are announced without stealing focus. */}
      <div aria-live="polite" className="empty:hidden">
        {state.status === "error" ? (
          <p className="hairline-t mt-6 flex items-start gap-3 pt-5 text-[0.9375rem] text-ink">
            <Alert className="mt-0.5 shrink-0 text-accent-ink" size={16} />
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  errorId,
  error,
  required = false,
  children,
}: {
  label: string;
  id: string;
  errorId: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4">
      <label htmlFor={id} className="label flex items-center gap-2 text-ink-2">
        {label}
        {required ? (
          <span className="text-accent-ink" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="normal-case tracking-normal text-ink-3">(optional)</span>
        )}
      </label>

      <div className="mt-3">{children}</div>

      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-[0.8125rem] text-accent-ink">
          <Alert size={13} className="shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Builds the fallback mailto: URL, pre-filled with what was typed.
 *
 * Mail clients and browsers truncate very long mailto URLs, and `details`
 * allows 4000 characters, so the body is capped. When it does get cut the cut
 * is announced inside the message itself — visible in the compose window
 * before anything is sent — rather than quietly dropping the tail.
 */
const MAILTO_BODY_MAX = 1400;

function fallbackMailto(values: ContactValues) {
  const lines = (Object.keys(contactFieldLabels) as ContactField[])
    .filter((field) => values[field].trim())
    .map((field) => `${contactFieldLabels[field]}: ${values[field].trim()}`)
    .join("\n");

  const body =
    lines.length > MAILTO_BODY_MAX
      ? `${lines.slice(0, MAILTO_BODY_MAX)}\n\n[Message truncated here — please paste the rest before sending.]`
      : lines;

  const subject = `Project enquiry${values.name.trim() ? ` — ${values.name.trim()}` : ""}`;

  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Post-submit panel. The wording is driven entirely by `delivered` — the one
 * thing the client actually knows about what happened to the message.
 */
function ResultPanel({
  state,
  onReset,
  className = "",
}: {
  state: Extract<SubmitState, { status: "done" }>;
  onReset: () => void;
  className?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={`frame p-8 lg:p-10 ${className}`}>
      <p className="label flex items-center gap-2 text-accent-ink">
        <Check size={14} />
        {state.delivered ? "Sent" : "Received"}
      </p>

      <p className="display-3 mt-5 max-w-[20ch]">
        {state.delivered ? "Thanks — we have your enquiry." : "One more step."}
      </p>

      <p className="mt-5 max-w-md leading-relaxed text-ink-2">{state.message}</p>

      {!state.delivered ? (
        <p className="mt-5 max-w-md leading-relaxed text-ink-2">
          So nothing is lost, send the same details straight to us by email — the button below
          opens your mail app with everything you just wrote already filled in.
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {!state.delivered ? (
          <a href={fallbackMailto(state.sent)} className="btn btn-primary">
            Email {contact.email}
          </a>
        ) : null}

        <button type="button" onClick={onReset} className="btn btn-secondary">
          Send another enquiry
        </button>
      </div>
    </div>
  );
}
