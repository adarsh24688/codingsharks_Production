import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import site from "@/data/site.json";
import codingLogo from "@/assets/images/Coding.png";
import { Container } from "@/components/layout/container";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "All Articles", href: "/blog" },
];

/* Light, elegant header for the blog microsite (no dark chrome). */
export function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src={codingLogo}
              alt={site.brand.name}
              width={120}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--acc)] px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]">
            Explore Courses <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </header>
  );
}

/* Light footer for the blog microsite. */
export function BlogFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-secondary">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-xl font-semibold text-foreground">
              {site.brand.name}
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.brand.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Explore
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-[var(--acc)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`tel:${site.contact.phone}`}
                className="text-[var(--acc)] underline-offset-2 hover:underline">
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="break-all text-muted-foreground transition-colors hover:text-foreground">
                {site.contact.email}
              </a>
              <address className="not-italic leading-relaxed text-muted-foreground">
                {site.address.city}, {site.address.region}, {site.address.country}
              </address>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
