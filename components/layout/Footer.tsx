import Link from "next/link";
import { contact, footerServices, fullNav, legalNav, site, socials } from "@/data/site";
import { NavLink } from "./NavLink";
import { ArrowUpRight } from "@/components/ui/Icons";

/**
 * Footer — the site's one large dark surface.
 *
 * Charcoal rather than black, hairlines in carbon-rule, and the same mono label
 * system as the rest of the page so the switch in tone does not read as a
 * different website.
 */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-carbon bg-carbon text-chalk">
      <div className="shell py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          {/* Identity */}
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold tracking-[-0.03em] text-chalk">
              {site.shortName}
              <span className="reg-dot ml-2 mb-[3px] inline-block" aria-hidden="true" />
              <span className="sr-only">{site.name}</span>
            </p>
            <p className="label-sm mt-2 text-chalk-2">Digital Studio</p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-chalk-2">{site.tagline}</p>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-chalk-3">
              A unit of <span className="text-chalk-2">FN Group</span> — home of FN News Channel &amp; Hamara Sports.
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="mt-7 inline-flex items-center gap-2 border-b border-carbon-rule pb-1 text-[0.9375rem] text-chalk transition-colors duration-200 hover:border-accent"
            >
              {contact.email}
              <ArrowUpRight className="text-accent" size={14} />
            </a>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="label text-chalk-2">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {fullNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="text-[0.9375rem] text-chalk-2 transition-colors duration-200 hover:text-chalk"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="label text-chalk-2">Services</h2>
            <ul className="mt-5 space-y-3">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <NavLink
                    href={item.href}
                    className="text-[0.9375rem] text-chalk-2 transition-colors duration-200 hover:text-chalk"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio + social */}
          <div>
            <h2 className="label text-chalk-2">Studio</h2>
            <ul className="mt-5 space-y-3">
              <li className="text-[0.9375rem] text-chalk-2">{contact.location}</li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="text-[0.9375rem] text-chalk-2 transition-colors duration-200 hover:text-chalk"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="text-[0.9375rem] text-chalk-2">{contact.hours}</li>
            </ul>

            <h2 className="label mt-8 text-chalk-2">Follow</h2>
            <ul className="mt-5 space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-chalk-2 transition-colors duration-200 hover:text-chalk"
                  >
                    {social.label}
                    <ArrowUpRight
                      className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      size={12}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-14 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-sm text-chalk-2">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-sm text-chalk-2 transition-colors duration-200 hover:text-chalk"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
