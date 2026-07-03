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
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of FomaPrint and the fulfillment services operated by FOMA
            FAMILY LLC (&ldquo;FomaPrint,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a limited liability company
            based in Alpharetta, Georgia, USA.
          </p>
          <p>
            FomaPrint is a business-to-business (B2B) production and fulfillment
            partner. We provide blind-ship, white-label print-on-demand and
            laser engraving for online resellers, brands, and shops who sell to
            their own customers. These Terms are an agreement between FomaPrint
            and you as a Reseller — they are not a consumer agreement with your
            end customers.
          </p>
          <p>
            By creating an account, requesting a quote, funding a wallet, or
            submitting an order, you confirm that you are acting on behalf of a
            business and that you agree to these Terms. If you do not agree, do
            not use our services.
          </p>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              1. Definitions
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium text-foreground">
                  Reseller / you
                </span>{" "}
                — the business or person who opens an account with FomaPrint and
                submits orders for fulfillment to their own customers.
              </li>
              <li>
                <span className="font-medium text-foreground">End Customer</span>{" "}
                — the person or business that buys the finished product from the
                Reseller. FomaPrint has no direct contractual relationship with
                End Customers.
              </li>
              <li>
                <span className="font-medium text-foreground">Order</span> — a
                request submitted to FomaPrint to produce and ship one or more
                personalized items.
              </li>
              <li>
                <span className="font-medium text-foreground">Artwork</span> —
                the design, file, names, or personalization you submit to be
                printed or engraved.
              </li>
              <li>
                <span className="font-medium text-foreground">Wallet</span> —
                the prepaid balance held in your FomaPrint account from which
                order charges are deducted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              2. Nature of the service and the parties&apos; relationship
            </h2>
            <p className="mt-3">
              FomaPrint acts solely as your production and fulfillment supplier.
              You are the seller of record to your End Customers. As between
              you and FomaPrint:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You set your own retail prices, run your own storefront, and
                handle your own customer service, returns policy, and
                communications with your End Customers.
              </li>
              <li>
                You are responsible for collecting and remitting any sales tax,
                VAT, or other taxes owed on your sales to End Customers. Our
                wholesale pricing to you does not include such taxes.
              </li>
              <li>
                Nothing in these Terms creates a partnership, joint venture,
                franchise, employment, or agency relationship. We are
                independent businesses.
              </li>
            </ul>
            <p className="mt-3">
              We may decline to fulfill any Order at our discretion, including
              Orders we reasonably believe are unlawful, infringing, fraudulent,
              or commercially impractical.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              3. Reseller accounts and eligibility
            </h2>
            <p className="mt-3">
              Our services are available to businesses only. To use FomaPrint
              you must:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Provide accurate, complete account information and keep it
                current. We may require a business name, EIN/reseller
                identification, or other verification.
              </li>
              <li>
                Keep your login credentials confidential. You are responsible
                for all activity under your account.
              </li>
              <li>
                Maintain one account per business unless we approve otherwise.
              </li>
            </ul>
            <p className="mt-3">
              We may approve, decline, suspend, or close accounts at our
              discretion, including for inactivity, unpaid balances, or
              violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              4. Blind and white-label shipping
            </h2>
            <p className="mt-3">
              Unless you instruct otherwise, Orders ship blind:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Packages contain no FomaPrint branding, invoices, or marketing
                materials. The shipment appears to come from your brand.
              </li>
              <li>
                Where supported, you may supply your own branded packing slip or
                approved insert. Inserts must meet our size, weight, and content
                requirements, and we may decline materials that are unlawful,
                infringing, or unsafe.
              </li>
              <li>
                We will not market to, solicit, or knowingly contact your End
                Customers for our own purposes. End Customer information you
                provide is used only to fulfill and deliver your Orders.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              5. Orders and same-day production
            </h2>
            <p className="mt-3">
              We operate on a same-day / next-run production model. There is no
              per-order proof-approval step:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                When you submit an Order to our system, it is queued for our
                next production run — typically produced the following morning.
                Once an Order enters a production run it is locked and cannot
                be edited or canceled.
              </li>
              <li>
                Because we do not wait for separate approval and we produce
                files exactly as you submit them, you are solely responsible
                for the accuracy and quality of everything you upload —
                spelling, names, dates, the Artwork file and its resolution,
                personalization details, quantities, finishing options, and End
                Customer shipping addresses.
              </li>
              <li>
                We print and engrave your files as received. We do not
                redesign, correct, color-match, or proof your files unless you
                have separately arranged a design or pre-production review with
                us.
              </li>
              <li>
                Errors that originate in what you submitted — typos,
                low-resolution or unsuitable Artwork, wrong personalization, or
                an incorrect/incomplete address — are not eligible for a free
                redo (see Section 10).
              </li>
            </ul>
            <p className="mt-3">
              Because items are personalized and made to order, all Orders are
              final once submitted. Please double-check every Order before
              uploading it.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              6. Quotes, wholesale pricing, and price changes
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Pricing is wholesale and provided by quote rather than listed
                publicly. Per-unit rates depend on the product, personalization,
                quantity, and finishing options, and are confirmed in your quote
                or current pricing schedule before production.
              </li>
              <li>
                Engraving and personalization may carry additive position fees
                (for example, a fee for the first engraving location and
                smaller fees for each additional location, up to a maximum
                number of locations per item). The exact amounts are those set
                out in your current quote or pricing schedule and may be
                updated over time.
              </li>
              <li>
                Blank (undecorated) products — items ordered with no printing
                or engraving — carry an additional packaging fee per item
                (currently $1.00) to cover handling and protective packaging.
              </li>
              <li>
                We may update base pricing and fees from time to time. Because
                you set your own retail prices, you are responsible for
                monitoring our current pricing and adjusting your margins.
                Continued use of the service after a price change applies that
                change to new Orders.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              7. Wallet, payment, and billing
            </h2>
            <p className="mt-3">
              FomaPrint operates on a prepaid wallet model for Resellers:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You fund your Wallet by bank wire / direct bank transfer. Order
                charges are deducted automatically from your Wallet balance at
                our quoted rates.
              </li>
              <li>
                Orders are normally produced only when your Wallet holds
                sufficient funds. Approved, trusted accounts may be permitted
                to carry a negative balance up to a limit we set, at our sole
                discretion and revocable at any time.
              </li>
              <li>
                Outstanding balances are due under the payment terms shown in
                your account (for example, a rolling settlement period). If
                your balance is past due or your negative-balance allowance is
                exceeded, we may pause production, hold shipments, or suspend
                your account until the balance is cleared.
              </li>
              <li>
                We provide account statements (for example, daily and/or weekly
                summaries) so you can reconcile activity. You should review
                statements promptly and notify us of any discrepancy.
              </li>
              <li>
                Because this is a B2B prepaid arrangement, payment disputes are
                handled directly with us. You agree not to initiate bank
                reversals or chargebacks against funded Wallet transactions;
                disputes are resolved under these Terms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              8. Intellectual property and artwork
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You are responsible for ensuring you hold all rights to the
                names, logos, designs, photographs, and artwork you submit. By
                submitting artwork, you represent and warrant that you have the
                necessary rights and that the content does not infringe any
                third party&apos;s intellectual property, publicity, or other
                rights.
              </li>
              <li>
                You grant FomaPrint a limited, non-exclusive license to
                reproduce, print, and engrave your submitted artwork solely to
                produce and fulfill your Orders. You retain ownership of your
                designs.
              </li>
              <li>
                You agree to indemnify and hold FomaPrint harmless from any
                claim, demand, loss, or expense (including reasonable legal
                fees) arising from artwork or content you submit, or from your
                sales to End Customers.
              </li>
              <li>
                We may refuse, hold, or remove any Order or content we
                reasonably believe is infringing, counterfeit, unlawful,
                hateful, or otherwise prohibited, and may comply with valid
                takedown or legal requests.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              9. Production, turnaround, and shipping
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Production times are estimates and begin when your Order enters
                our production run. Where we offer same-day or next-morning
                production, availability depends on submission timing, queue,
                product, and materials, and is not guaranteed.
              </li>
              <li>
                Risk of loss and title pass to you (or your End Customer) the
                moment we hand the shipment to the carrier. From that point,
                FomaPrint has no responsibility for the shipment — including
                loss, theft, damage or breakage in transit, delays, misroutes,
                non-delivery, or delivery to an incorrect or incomplete address
                you or your End Customer provided.
              </li>
              <li>
                Any claim against the carrier for a lost, delayed, or damaged
                shipment is yours (or your End Customer&apos;s) to file with
                the carrier. If you want protection against transit loss or
                breakage, you are responsible for arranging shipping insurance
                or offering it to your End Customers. Because we do not cover
                loss or breakage in transit, we recommend purchasing shipping
                insurance for high-value Orders.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              10. No returns; our only remedy is a production-fault remake
            </h2>
            <p className="mt-3">
              <span className="font-medium text-foreground">
                All sales are final.
              </span>{" "}
              We do not accept returns or exchanges of any kind. Because
              products are personalized and made to order, they cannot be
              restocked or resold. This includes — without limitation —
              buyer&apos;s remorse, End Customer change of mind, wrong
              size/color choices, and errors in the information, Artwork, or
              address you submitted.
            </p>
            <p className="mt-3">
              <span className="font-medium text-foreground">
                Our only remedy — our fault, our fix.
              </span>{" "}
              If an item is wrong because of a production fault on our side (a
              misprint, a mis-engraving, or the wrong item produced), we will
              remake it and reship it to your End Customer at no cost to you.
              This is our sole obligation regarding order issues. To request a
              remake, contact us within 30 days of delivery with the order ID
              and a clear photo or video showing the fault. No physical return
              is required. We review each request and may decline ones that
              fall outside this remedy. Approved remakes follow standard
              production times.
            </p>
            <p className="mt-3">
              <span className="font-medium text-foreground">
                Nothing after the carrier.
              </span>{" "}
              As stated in Section 9, once a shipment is handed to the carrier
              we have no responsibility for it — loss, theft, breakage or
              damage in transit, delays, non-delivery, or delivery to a
              wrong/incomplete address are not covered and are not eligible for
              a remake, reprint, or credit. Those are matters between you (or
              your End Customer) and the carrier.
            </p>
            <p className="mt-3">
              <span className="font-medium text-foreground">Not defects.</span>{" "}
              Minor, inherent variations are not faults — for example, slight
              color differences between a screen and the finished item, small
              variations in print placement within normal tolerance, and
              natural differences in engraving appearance across different
              materials and finishes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              11. Prohibited content and use
            </h2>
            <p className="mt-3">
              You agree not to use FomaPrint to produce or ship content that is
              unlawful, infringing, counterfeit, defamatory, hateful, sexually
              exploitative, or that promotes violence or illegal activity, or
              to use the service in any way that creates legal liability for us
              or others. Violations may result in immediate suspension or
              termination.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              12. Limitation of liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, FOMA FAMILY LLC is not
              liable for any indirect, incidental, special, or consequential
              damages — including lost profits, lost sales, lost goodwill, or
              End Customer claims — arising from your use of our products,
              services, or website.
            </p>
            <p className="mt-3">
              Our total aggregate liability for any Order is limited to the
              amount you paid us for that Order. Some jurisdictions do not
              allow certain limitations, so portions of this section may not
              apply to you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              13. Indemnification
            </h2>
            <p className="mt-3">
              You agree to indemnify, defend, and hold harmless FOMA FAMILY LLC
              and its owners and staff from any claims, damages, liabilities,
              costs, and expenses (including reasonable legal fees) arising
              from: (a) artwork or content you submit; (b) your sales,
              marketing, pricing, and dealings with End Customers; (c) your
              tax or regulatory obligations; or (d) your breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              14. Confidentiality and data
            </h2>
            <p className="mt-3">
              Each party will protect the other&apos;s non-public business
              information. End Customer data you provide (names, addresses,
              order details) is processed by FomaPrint only to fulfill and ship
              your Orders and is not sold or used to market to your customers.
              You are responsible for having a lawful basis to share End
              Customer data with us and for your own privacy obligations to
              your customers.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              15. Suspension and termination
            </h2>
            <p className="mt-3">
              We may limit, suspend, or terminate your account and access to
              the services — and decline or cancel Orders — if you breach these
              Terms, carry unpaid or excessive balances, submit prohibited
              content, or create legal or operational risk. You may close your
              account at any time after settling any outstanding balance.
              Sections covering payment owed, IP, indemnification, and
              liability survive termination.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              16. Disclaimer of warranties
            </h2>
            <p className="mt-3">
              Except for the redo/claim remedies in Section 10, the services
              are provided &ldquo;as is.&rdquo; Minor, reasonable variations in
              color, finish, placement, and materials inherent to print and
              laser-engraving processes are not defects.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              17. Governing law
            </h2>
            <p className="mt-3">
              These Terms are governed by the laws of the State of Georgia,
              USA, without regard to its conflict-of-laws rules. Any dispute
              will be brought in the state or federal courts located in
              Georgia, and you consent to that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              18. Changes to these Terms
            </h2>
            <p className="mt-3">
              We may update these Terms from time to time. The &ldquo;Last
              updated&rdquo; date reflects the current version. Continued use of
              the services after changes take effect constitutes acceptance of
              the updated Terms.
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
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
