import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function CategoryLoading() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Skeleton className="h-4 w-48 rounded" />
      <div className="mt-6 flex items-center gap-4">
        <Skeleton className="size-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-7 w-56 rounded" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full rounded" />
        </div>
      </div>
      <ProductGridSkeleton className="mt-10" count={8} />
    </div>
  );
}
