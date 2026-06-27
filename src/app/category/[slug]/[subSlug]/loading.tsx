import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function SubcategoryLoading() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Skeleton className="h-4 w-64 rounded" />
      <div className="mt-6">
        <Skeleton className="h-7 w-52 rounded" />
        <Skeleton className="mt-2 h-4 w-72 max-w-full rounded" />
      </div>
      <ProductGridSkeleton className="mt-10" count={12} />
    </div>
  );
}
