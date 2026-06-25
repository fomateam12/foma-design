import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms and conditions for using ${site.name} and ordering from ${site.legalName}.`,
  alternates: { canonical: "/terms" },
};

const UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <article className="mt-6 max-w-3xl">
        <h1 className="text-h2 text-foreground">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {UPDATED}
        </p>

        <div className="mt-8 space-y-8 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{" "}
            {site.name}, operated by {site.legalName}. By accessing our site or
            placing an order, you agree to these Terms.
          </p>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Custom &amp; personalized orders
            </h2>
            <p className="mt-3">
              Because our products are personalized and made to order, all custom
              orders are final once you approve your design proof. Please review
              your proof carefully — including spelling, dates and artwork —
              before approving, as engraving cannot be undone.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Quotes &amp; pricing
            </h2>
            <p className="mt-3">
              Pricing is wholesale and provided by quote rather than listed
              publicly. Per-unit rates depend on the product, personalization,
              quantity and finishing options. We confirm final pricing in your
              quote before production, and pricing may be updated over time.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Intellectual property &amp; artwork
            </h2>
            <p className="mt-3">
              You are responsible for ensuring you have the right to use any
              names, logos or artwork you submit for engraving. By submitting
              artwork, you confirm you hold the necessary rights and grant us
              permission to reproduce it solely to fulfill your order.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Turnaround &amp; shipping
            </h2>
            <p className="mt-3">
              Production times are estimates and begin after proof approval.
              Shipping timelines depend on the carrier and destination. We are
              not liable for carrier delays outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Returns &amp; issues
            </h2>
            <p className="mt-3">
              If your order arrives damaged or differs from your approved proof,
              contact us within 7 days of delivery and we&apos;ll make it right.
              Personalized items cannot be returned for buyer&apos;s remorse.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Limitation of liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {site.legalName} is not
              liable for any indirect or consequential damages arising from the
              use of our products or website. Our total liability for any order
              is limited to the amount you paid for that order.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about these Terms? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-brand-strong hover:underline"
              >
                {site.email}
              </a>{" "}
              or call{" "}
              <a
                href={site.phoneHref}
                className="font-medium text-brand-strong hover:underline"
              >
                {site.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
