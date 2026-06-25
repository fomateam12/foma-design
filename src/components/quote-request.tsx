"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Loader2,
  Send,
  Minus,
  Plus,
  Trash2,
  FileText,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuote } from "@/components/quote-provider";
import { cn } from "@/lib/utils";
import {
  quoteFormSchema,
  quoteSchema,
  SHIP_MODELS,
  type QuoteFormInput,
} from "@/lib/validation";

const FIELD = "h-11";
const SELECT =
  "h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-destructive">{msg}</p>;
}

export function QuoteRequest() {
  const {
    items,
    count,
    totalQty,
    hydrated,
    updateQuantity,
    updateNote,
    removeItem,
    clear,
  } = useQuote();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormInput>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      shipModel: undefined,
      deadline: "",
      artworkUrl: "",
      notes: "",
      consent: false,
      company: "",
    },
  });

  async function onSubmit(values: QuoteFormInput) {
    const payload = {
      ...values,
      items: items.map((i) => ({
        sku: i.sku,
        name: i.name,
        quantity: i.quantity,
        note: i.note ?? "",
      })),
    };

    const check = quoteSchema.safeParse(payload);
    if (!check.success) {
      toast.error("Add at least one product to your quote first.");
      return;
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      toast.success("Quote request sent! We'll reply within one business day.");
      reset();
      clear();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't submit your request.",
      );
    }
  }

  /* ------------------------------ loading ------------------------------ */
  if (!hydrated) {
    return (
      <div className="mt-10 grid min-h-[36vh] place-items-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  /* ------------------------------- empty ------------------------------- */
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand-muted text-brand-strong">
          <FileText className="size-7" />
        </span>
        <h2 className="mt-5 font-heading text-xl font-semibold text-foreground">
          Your quote is empty
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Browse the catalog and tap{" "}
          <span className="font-medium text-foreground">Add to quote</span> on any
          product. Build a list, then send it over for tiered wholesale pricing —
          no account required.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/categories" className={cn(buttonVariants({ variant: "brand", size: "lg" }))}>
            Browse the catalog
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/custom-order"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Start a custom order
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------- filled ------------------------------ */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Line items */}
        <div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Your items
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {count} {count === 1 ? "line" : "lines"} · {totalQty}{" "}
                {totalQty === 1 ? "unit" : "units"}
              </span>
            </h2>
            <button
              type="button"
              onClick={clear}
              className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
            >
              Clear all
            </button>
          </div>

          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 p-4">
                <Link
                  href={`/product/${item.id}`}
                  className="shrink-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    seed={item.sku}
                    width={120}
                    sizes="72px"
                    className="size-[72px] rounded-xl border border-border"
                    imgClassName="p-1.5"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.id}`}
                        className="line-clamp-2 text-sm font-medium text-foreground hover:text-brand-strong"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                        {item.sku}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-3">
                    {/* Quantity stepper */}
                    <div className="inline-flex items-center rounded-lg border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="grid size-8 place-items-center rounded-l-lg text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        aria-label={`Quantity for ${item.name}`}
                        className="h-8 w-12 border-x border-border bg-transparent text-center text-sm tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="grid size-8 place-items-center rounded-r-lg text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.note ?? ""}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      placeholder="Add a note (engraving, colorway…)"
                      maxLength={500}
                      className="h-8 min-w-0 flex-1 rounded-lg border border-border bg-transparent px-2.5 text-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/categories"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-strong hover:underline"
          >
            <Plus className="size-4" />
            Add more products
          </Link>
        </div>

        {/* Brief / contact */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Where should we send your quote?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fields marked * are required.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="q-name">Your name *</Label>
                <Input
                  id="q-name"
                  className={cn(FIELD, "mt-1.5")}
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
                <ErrorText msg={errors.fullName?.message} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="q-email">Email *</Label>
                  <Input
                    id="q-email"
                    type="email"
                    className={cn(FIELD, "mt-1.5")}
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  <ErrorText msg={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor="q-phone">Phone</Label>
                  <Input
                    id="q-phone"
                    type="tel"
                    className={cn(FIELD, "mt-1.5")}
                    {...register("phone")}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="q-business">Business name</Label>
                  <Input
                    id="q-business"
                    className={cn(FIELD, "mt-1.5")}
                    {...register("businessName")}
                  />
                </div>
                <div>
                  <Label htmlFor="q-website">Store / website</Label>
                  <Input
                    id="q-website"
                    placeholder="https://"
                    className={cn(FIELD, "mt-1.5")}
                    {...register("website")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="q-ship">Fulfillment model *</Label>
                <select
                  id="q-ship"
                  className={cn(SELECT, "mt-1.5")}
                  defaultValue=""
                  aria-invalid={!!errors.shipModel}
                  {...register("shipModel")}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {SHIP_MODELS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ErrorText msg={errors.shipModel?.message} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="q-deadline">Target date</Label>
                  <Input
                    id="q-deadline"
                    placeholder="e.g. before Dec 1"
                    className={cn(FIELD, "mt-1.5")}
                    {...register("deadline")}
                  />
                </div>
                <div>
                  <Label htmlFor="q-artwork">Artwork link</Label>
                  <Input
                    id="q-artwork"
                    placeholder="Drive / Dropbox URL"
                    className={cn(FIELD, "mt-1.5")}
                    {...register("artworkUrl")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="q-notes">Anything else?</Label>
                <Textarea
                  id="q-notes"
                  rows={3}
                  placeholder="Personalization details, packaging, branding inserts…"
                  className="mt-1.5"
                  {...register("notes")}
                />
              </div>

              <div>
                <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4 rounded border-input accent-primary"
                    aria-invalid={!!errors.consent}
                    {...register("consent")}
                  />
                  <span>
                    I agree to be contacted about wholesale pricing by{" "}
                    <span className="text-foreground">FomaPrint</span>. *
                  </span>
                </label>
                <ErrorText msg={errors.consent?.message} />
              </div>

              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send quote request
                  </>
                )}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-brand-strong" />
                No account needed · We reply within one business day
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
