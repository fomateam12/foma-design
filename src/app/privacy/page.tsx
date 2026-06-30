import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects your information at ${site.name}.`,
  alternates: { canonical: "/privacy" },
};

const UPDATED = "June 2026";

export default function PrivacyPage() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <article className="mt-6 max-w-3xl">
        <h1 className="text-h2 text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {UPDATED}
        </p>

        <div className="mt-8 space-y-8 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            {site.legalName} (&ldquo;{site.name},&rdquo; &ldquo;we,&rdquo;
            &ldquo;us&rdquo;) respects your privacy. This policy explains what
            information we collect when you use {site.name}, how we use it, and
            the choices you have. By using our site or submitting a form, you
            agree to this policy.
          </p>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Information we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Contact details</strong> you
                provide through our custom order or reseller forms, such as your
                name, business name, email, phone number and website.
              </li>
              <li>
                <strong className="text-foreground">Order details</strong> you
                share, including the products, quantities, personalization text
                and any notes needed to fulfill your request.
              </li>
              <li>
                <strong className="text-foreground">Usage data</strong> such as
                basic, non-identifying analytics about how visitors use the site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              How we use your information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To respond to your inquiries and prepare quotes.</li>
              <li>To produce, personalize and ship your orders.</li>
              <li>
                To review reseller applications and set up wholesale accounts.
              </li>
              <li>
                To improve our products, website and customer experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              How we share information
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We share it only with
              trusted service providers that help us operate — for example, email
              delivery and shipping partners — and only as needed to provide our
              services or comply with the law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Data retention &amp; security
            </h2>
            <p className="mt-3">
              We keep your information only as long as necessary to fulfill the
              purposes described here, including legal and accounting
              requirements. We use reasonable safeguards to protect your data,
              though no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Your choices
            </h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your
              personal information at any time by contacting us. You can also opt
              out of non-essential communications.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about this policy? Email{" "}
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
