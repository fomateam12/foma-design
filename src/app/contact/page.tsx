import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Factory,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Store,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}. Email ${site.email} or message us on WhatsApp for wholesale pricing, quotes and reseller inquiries.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${site.name}`,
    description: `Questions about wholesale pricing or becoming a reseller? Reach the ${site.name} team.`,
  },
};

const CHANNELS = [
  {
    icon: Mail,
    title: "Email us",
    body: "Best for detailed requests and artwork.",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    body: "Quick questions and order updates.",
    value: site.whatsappDisplay,
    href: site.whatsappHref,
    external: true,
  },
];

const QUICK_LINKS = [
  {
    icon: FileText,
    title: "Request a quote",
    body: "Send your product list and volume to get wholesale pricing.",
    href: "/quote",
  },
  {
    icon: Store,
    title: "Become a reseller",
    body: "Apply for a wholesale account on the full catalog.",
    href: "/sell",
  },
];

export default function ContactPage() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <Reveal className="mt-6 max-w-2xl">
        <span className="eyebrow text-brand-strong">Get in touch</span>
        <h1 className="mt-3 text-h2 text-foreground">
          Let&apos;s talk shop
        </h1>
        <p className="mt-4 text-lead text-muted-foreground">
          Questions about a product, wholesale pricing or becoming a reseller?
          Reach out and a real person from the {site.name} team will get back to
          you — typically the same business day.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {CHANNELS.map((c, i) => (
          <Reveal key={c.title} delay={Math.min(i * 0.06, 0.18)}>
            <a
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                <c.icon className="size-5" />
              </span>
              <h2 className="mt-4 font-heading text-base font-semibold text-foreground">
                {c.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              <p className="mt-3 font-medium text-brand-strong group-hover:underline">
                {c.value}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Quick links */}
        <div className="grid gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.title}
              href={q.href}
              className="group flex flex-col rounded-2xl border border-border bg-secondary/40 p-6 transition-colors hover:border-brand/40"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-background text-brand-strong ring-1 ring-border">
                <q.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                {q.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {q.body}
              </p>
              <span className="mt-3 text-sm font-semibold text-brand-strong group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        {/* Business details */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Business details
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Store className="mt-0.5 size-4 shrink-0 text-brand-strong" />
              <div>
                <dt className="text-muted-foreground">Company</dt>
                <dd className="font-medium text-foreground">{site.legalName}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-strong" />
              <div>
                <dt className="text-muted-foreground">Hours</dt>
                <dd className="font-medium text-foreground">
                  Monday – Friday, 9am – 5pm ET
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-strong" />
              <div>
                <dt className="text-muted-foreground">Address</dt>
                <dd className="font-medium text-foreground">
                  {site.address.street}, {site.address.city},{" "}
                  {site.address.state}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Factory className="mt-0.5 size-4 shrink-0 text-brand-strong" />
              <div>
                <dt className="text-muted-foreground">Production</dt>
                <dd className="font-medium text-foreground">{site.madeIn}</dd>
              </div>
            </div>
          </dl>
          <Link
            href="/quote"
            className={cn(buttonVariants({ variant: "brand", size: "sm" }), "mt-6 w-full")}
          >
            Request a quote
          </Link>
        </div>
      </div>
    </div>
  );
}
