import { contact, socials } from "@/data/site";

/**
 * Contact details panel — the studio's channels, in a framed ruled stack.
 *
 * Shared by the homepage contact section and the /contact page, so the two can
 * never fall out of step. Everything comes from `data/site.ts`: changing the
 * phone number or a social handle is a data edit, not a code edit.
 *
 * No "call us" button. The phone number in the data file is still a
 * placeholder, and a tappable number that dials nothing is a broken action
 * dressed as a working one — so the number is shown as text while email and the
 * form carry the actual load. When a real number lands in `data/site.ts` the
 * `tel:` link becomes honest and can be added here.
 */

export function ContactDetails() {
  const details = [
    { dt: "Email", dd: contact.email, href: `mailto:${contact.email}` },
    { dt: "Phone", dd: contact.phone, href: undefined },
    { dt: "Based in", dd: `${contact.location} — working worldwide`, href: undefined },
  ];

  return (
    <div className="frame p-7 lg:p-8">
      {/* Between `sm` and `lg` the card is full-page width, where three
          stacked rows holding one short line each would leave 630px of
          empty measure per row. It becomes a three-column data strip
          across that band and returns to a stack at `lg`, where it is a
          narrow sidebar again. Every row carries its own top rule, so
          the same markup reads as a ruled list stacked and as a table
          header across — no first/last special-casing either way. */}
      <dl className="sm:grid sm:grid-cols-3 sm:gap-x-8 lg:block">
        {details.map(({ dt, dd, href }) => (
          <div key={dt} className="hairline-t py-4">
            <dt className="label text-ink-3">{dt}</dt>
            <dd className="mt-2">
              {href ? (
                <a href={href} className="link-draw break-all text-[0.9375rem]">
                  {dd}
                </a>
              ) : (
                <span className="text-[0.9375rem] text-ink-2">{dd}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="hairline-t mt-2 pt-6">
        <p className="label text-ink-3">Follow</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-2">
          {socials.map((social) => (
            <li key={social.label}>
              {/* Off-site, so it opens in a new tab like every other social
                  link on the site — and says so for anyone who cannot see the
                  tab appear. */}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-[0.875rem]"
                data-cta="contact-social"
              >
                {social.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="label-sm mt-6 leading-relaxed text-ink-3">
        <span className="normal-case tracking-normal">{contact.hours}</span>
      </p>
    </div>
  );
}
