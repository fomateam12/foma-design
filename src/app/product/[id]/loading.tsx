import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Skeleton className="h-4 w-72 max-w-full rounded" />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Skeleton className="aspect-square rounded-3xl" />

        <div>
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="mt-3 h-9 w-4/5 rounded" />
          <Skeleton className="mt-3 h-4 w-32 rounded" />
          <Skeleton className="mt-6 h-24 w-full rounded-2xl" />
          <Skeleton className="mt-5 h-4 w-full rounded" />
          <Skeleton className="mt-2 h-4 w-11/12 rounded" />
          <Skeleton className="mt-2 h-4 w-3/4 rounded" />
          <Skeleton className="mt-7 h-32 w-full rounded-2xl" />
          <Skeleton className="mt-6 h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
