"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  resellerApplicationSchema,
  BUSINESS_TYPES,
  MONTHLY_VOLUMES,
  HEAR_ABOUT_US,
  type ResellerApplicationInput,
} from "@/lib/validation";

const FIELD = "h-11";
const SELECT =
  "h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-destructive">{msg}</p>;
}

export function SellerApplicationForm() {
  // Time the form has been on screen — sent to the handler as a cheap bot gate.
  // Set in an effect (not during render) so it stays out of the render path.
  const mountedAt = useRef<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResellerApplicationInput>({
    resolver: zodResolver(resellerApplicationSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      businessType: undefined,
      monthlyVolume: undefined,
      products: "",
      about: "",
      hearAboutUs: undefined,
      hearAboutUsOther: "",
      consent: false,
      fax: "",
    },
  });

  const hearAboutUs = watch("hearAboutUs");

  async function onSubmit(values: ResellerApplicationInput) {
    setSubmitError(null);
    const started = mountedAt.current;
    const elapsedMs = started > 0 ? Date.now() - started : undefined;
    try {
      const res = await fetch("/api/reseller-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, elapsedMs }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Couldn't submit your application. Please try again.",
      );
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-brand-muted text-brand-strong">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
          Application received
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks — check your inbox for a confirmation. We&apos;ll review your
          application and follow up the same business day with pricing and
          next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="space-y-5"
      noValidate
    >
      {/* Honeypot — hidden from people, tempting to bots. Must stay empty. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("fax")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="se-name">Your name *</Label>
          <Input
            id="se-name"
            className={cn(FIELD, "mt-1.5")}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <ErrorText msg={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="se-business">Business name *</Label>
          <Input
            id="se-business"
            className={cn(FIELD, "mt-1.5")}
            aria-invalid={!!errors.businessName}
            {...register("businessName")}
          />
          <ErrorText msg={errors.businessName?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="se-email">Email *</Label>
          <Input
            id="se-email"
            type="email"
            className={cn(FIELD, "mt-1.5")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <ErrorText msg={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="se-phone">Phone *</Label>
          <Input
            id="se-phone"
            type="tel"
            className={cn(FIELD, "mt-1.5")}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <ErrorText msg={errors.phone?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="se-website">Website or social (optional)</Label>
        <Input
          id="se-website"
          placeholder="https://"
          className={cn(FIELD, "mt-1.5")}
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="se-type">Business type *</Label>
          <select
            id="se-type"
            className={cn(SELECT, "mt-1.5")}
            defaultValue=""
            aria-invalid={!!errors.businessType}
            {...register("businessType")}
          >
            <option value="" disabled>
              Select…
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ErrorText msg={errors.businessType?.message} />
        </div>
        <div>
          <Label htmlFor="se-volume">Estimated monthly volume *</Label>
          <select
            id="se-volume"
            className={cn(SELECT, "mt-1.5")}
            defaultValue=""
            aria-invalid={!!errors.monthlyVolume}
            {...register("monthlyVolume")}
          >
            <option value="" disabled>
              Select…
            </option>
            {MONTHLY_VOLUMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ErrorText msg={errors.monthlyVolume?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="se-interest">Which products are you interested in? *</Label>
        <Input
          id="se-interest"
          placeholder="e.g. tumblers, cutting boards, frames"
          className={cn(FIELD, "mt-1.5")}
          aria-invalid={!!errors.products}
          {...register("products")}
        />
        <ErrorText msg={errors.products?.message} />
      </div>

      <div>
        <Label htmlFor="se-message">Tell us about your business</Label>
        <Textarea
          id="se-message"
          rows={4}
          placeholder="What you sell, who your customers are, and how we can help…"
          className="mt-1.5"
          {...register("about")}
        />
      </div>

      <div>
        <Label htmlFor="se-hear">How did you hear about us?</Label>
        <select
          id="se-hear"
          className={cn(SELECT, "mt-1.5")}
          defaultValue=""
          aria-invalid={!!errors.hearAboutUs}
          {...register("hearAboutUs")}
        >
          <option value="" disabled>
            Select…
          </option>
          {HEAR_ABOUT_US.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <ErrorText msg={errors.hearAboutUs?.message} />
        {hearAboutUs === "Other" ? (
          <Input
            placeholder="How did you find us?"
            className={cn(FIELD, "mt-2")}
            aria-label="How did you hear about us — other"
            {...register("hearAboutUsOther")}
          />
        ) : null}
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
            I agree to be contacted about reseller pricing by{" "}
            <span className="text-foreground">FomaPrint</span>. *
          </span>
        </label>
        <ErrorText msg={errors.consent?.message} />
      </div>

      {submitError ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive"
        >
          {submitError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="size-4" />
            Submit reseller application
          </>
        )}
      </Button>
    </form>
  );
}
