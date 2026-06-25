"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCw, TriangleAlert } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-px flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
        <TriangleAlert className="size-8" />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred. You can try again, or head back home. If
        the problem keeps happening, please get in touch.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}>
          <RotateCw className="size-4" />
          Try again
        </Button>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <Home className="size-4" />
          Back home
        </Link>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Still stuck? Email{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-brand-strong hover:underline"
        >
          {site.email}
        </a>
      </p>
    </div>
  );
}
