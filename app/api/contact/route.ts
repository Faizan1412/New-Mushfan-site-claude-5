import { NextResponse } from "next/server";
import {
  coerceContactValues,
  contactFieldLabels,
  validateContact,
  type ContactField,
  type ContactValues,
} from "@/data/contact-schema";
import { contact } from "@/data/site";

/**
 * Contact endpoint.
 *
 * ── IMPORTANT: DELIVERY IS OFF UNTIL TWO ENV VARS ARE SET ────────────────────
 * `deliver()` sends through Resend, but only when CONTACT_API_KEY and
 * CONTACT_FROM_EMAIL are both present. On a deployment without them — which is
 * every deployment until someone sets them — the route validates, logs, and
 * reports `delivered: false`.
 *
 * That flag is the whole point. Nothing here silently drops an enquiry while
 * pretending to have sent it: the form reads the flag and, when it is false,
 * says so and offers the studio's email address instead. A visitor is never
 * left believing a message arrived when it did not.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Rate limiting is in-memory and per-instance, which is enough to blunt a naive
 * flood from one address but is not a substitute for a real limiter. On a
 * serverless platform each instance keeps its own map and cold starts reset it —
 * move to a shared store (Upstash, Redis) when this handles real volume.
 */

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/**
 * Sends the enquiry on, and reports whether it actually left the building —
 * never `true` on a guess.
 *
 * Written against Resend's HTTP API, which needs no SDK: one fetch, no added
 * dependency. Both values come from the environment and are read inside the
 * function so nothing is captured at module scope and nothing can be reached
 * from the client bundle:
 *
 *   CONTACT_API_KEY    — provider API key. Server-side only. Never NEXT_PUBLIC_.
 *   CONTACT_FROM_EMAIL — sender on a domain verified with the provider.
 *
 * With either missing this returns false immediately, which is the state of a
 * fresh deployment. The `from` address is not hardcoded on purpose: sending
 * from an unverified domain fails at the provider, and a default that looks
 * plausible would turn a configuration mistake into a silently lost enquiry.
 *
 * Swapping providers means changing this function and nothing else.
 */
async function deliver(values: ContactValues): Promise<boolean> {
  const apiKey = process.env.CONTACT_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return false;

  const body = (Object.keys(contactFieldLabels) as ContactField[])
    .map((field) => `${contactFieldLabels[field]}: ${values[field] || "—"}`)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: contact.email,
        reply_to: values.email.trim(),
        subject: `New enquiry — ${values.name.trim()}`,
        text: `${body}\n`,
      }),
    });

    if (!response.ok) {
      // Status only. The body can echo the address and the key prefix, and this
      // lands in platform logs.
      console.error(`[contact] Provider rejected the send (HTTP ${response.status}).`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[contact] Provider request failed.", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const values = coerceContactValues(body);

  // The same validation the browser ran. The client's pass is a convenience;
  // this one is the actual gate.
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors, message: "Please check the highlighted fields." },
      { status: 422 },
    );
  }

  const delivered = await deliver(values);

  if (!delivered) {
    // Logged so the submission is at least recoverable from platform logs while
    // delivery is off or failing. Deliberately not silent. Name, email and
    // service only — the message body is the visitor's, and platform logs are
    // not where it belongs.
    console.warn("[contact] Enquiry received but NOT delivered.", {
      name: values.name,
      email: values.email,
      service: values.service,
    });
  }

  return NextResponse.json({
    ok: true,
    delivered,
    fallbackEmail: contact.email,
    message: delivered
      ? "Thanks — your enquiry is on its way."
      : "Your details reached the server, but email delivery is not switched on for this deployment yet, so nobody at the studio has been notified.",
  });
}
