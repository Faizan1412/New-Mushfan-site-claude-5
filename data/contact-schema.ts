/**
 * Contact form validation — one schema, used by both sides.
 *
 * The browser runs this for instant feedback and the route handler runs the same
 * functions again on the raw body. Client-side validation is a convenience, not a
 * control: anything can POST to the endpoint, so the server never trusts that the
 * form ran first.
 *
 * Written by hand rather than pulled from a validation library. The rules are a
 * dozen lines and the site otherwise ships no runtime dependencies beyond React
 * and Next — a schema library here would be the single largest thing in the
 * bundle for the least reason.
 */

import { budgetOptions, serviceOptions } from "./site";

export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "company"
  | "service"
  | "budget"
  | "details";

export type ContactValues = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  details: "",
};

/**
 * Deliberately permissive. Its job is to catch typos like a missing "@", not to
 * adjudicate RFC 5322 — the only real proof an address works is a reply to it,
 * and an over-strict pattern rejects valid addresses for no gain.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Digits, spaces and the usual punctuation, 7–20 characters. Phone is optional,
 * so this only runs when something was typed.
 */
const PHONE = /^[+()\-.\s\d]{7,20}$/;

const LIMITS = {
  name: 80,
  email: 160,
  phone: 20,
  company: 120,
  details: 4000,
} as const;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const details = values.details.trim();

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (name.length > LIMITS.name) {
    errors.name = `Please keep this under ${LIMITS.name} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > LIMITS.email || !EMAIL.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone && !PHONE.test(phone)) {
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  }

  if (values.company.trim().length > LIMITS.company) {
    errors.company = `Please keep this under ${LIMITS.company} characters.`;
  }

  // Selects are optional, but a value that isn't one of ours means the request
  // did not come from this form.
  if (values.service && !serviceOptions.includes(values.service as (typeof serviceOptions)[number])) {
    errors.service = "Please choose one of the listed services.";
  }

  if (values.budget && !budgetOptions.includes(values.budget as (typeof budgetOptions)[number])) {
    errors.budget = "Please choose one of the listed ranges.";
  }

  if (details.length < 10) {
    errors.details = "Tell us a little about the project — a sentence or two is plenty.";
  } else if (details.length > LIMITS.details) {
    errors.details = `Please keep this under ${LIMITS.details} characters.`;
  }

  return errors;
}

/** Narrows an unknown JSON body to ContactValues without throwing. */
export function coerceContactValues(input: unknown): ContactValues {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;
  const read = (key: ContactField) =>
    typeof source[key] === "string" ? (source[key] as string) : "";

  return {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    company: read("company"),
    service: read("service"),
    budget: read("budget"),
    details: read("details"),
  };
}

export const contactFieldLabels: Record<ContactField, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  service: "Service",
  budget: "Budget",
  details: "Project details",
};
