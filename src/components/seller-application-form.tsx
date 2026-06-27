"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  sellerApplicationSchema,
  BUSINESS_TYPES,
  MONTHLY_VOLUMES,
  type SellerApplicationInput,
} from "@/lib/validation";

const FIELD = "h-11";
const SELECT =
  "h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-destructive">{msg}</p>;
}

export function SellerApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SellerApplicationInput>({
    resolver: zodResolver(sellerApplicationSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      businessType: undefined,
      monthlyVolume: undefined,
      productInterest: "",
      message: "",
      consent: false,
      company: "",
    },
  });

  async function onSubmit(values: SellerApplicationInput) {
    try {
      const res = await fetch("/api/seller-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      toast.success("Application sent! We'll review and follow up soon.");
      reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't submit your application.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="se-name">Your name *</Label>
          <Input
            id="se-name"
            className={cn(FIELD, "mt-1.5")}
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          <ErrorText msg={errors.fullName?.message} />
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
          aria-invalid={!!errors.productInterest}
          {...register("productInterest")}
        />
        <ErrorText msg={errors.productInterest?.message} />
      </div>

      <div>
        <Label htmlFor="se-message">Tell us about your business</Label>
        <Textarea
          id="se-message"
          rows={4}
          placeholder="What you sell, who your customers are, and how we can help…"
          className="mt-1.5"
          {...register("message")}
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
            I agree to be contacted about reseller pricing by{" "}
            <span className="text-foreground">FomaPrint</span>. *
          </span>
        </label>
        <ErrorText msg={errors.consent?.message} />
      </div>

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
