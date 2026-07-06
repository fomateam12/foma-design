"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PHONE_COUNTRIES } from "@/data/phone-countries";

const COUNTRY_SELECT =
  "h-11 w-[108px] shrink-0 rounded-lg border border-input bg-transparent px-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface PhoneInputProps {
  id: string;
  countryIso2: string;
  onCountryChange: (iso2: string) => void;
  numberInputProps: UseFormRegisterReturn;
  ariaInvalid?: boolean;
  className?: string;
}

export function PhoneInput({
  id,
  countryIso2,
  onCountryChange,
  numberInputProps,
  ariaInvalid,
  className,
}: PhoneInputProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <select
        aria-label="Phone country code"
        className={COUNTRY_SELECT}
        value={countryIso2}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        {PHONE_COUNTRIES.map((c) => (
          <option key={c.iso2} value={c.iso2}>
            {c.flag} {c.iso2} +{c.dialCode}
          </option>
        ))}
      </select>
      <Input
        id={id}
        type="tel"
        aria-invalid={ariaInvalid}
        className="h-11 flex-1"
        {...numberInputProps}
      />
    </div>
  );
}
