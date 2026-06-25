import { Gift, CupSoda, Coffee, Frame, NotebookPen, Award } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { IconKey } from "@/data/types";

const ICONS: Record<IconKey, React.ComponentType<LucideProps>> = {
  gift: Gift,
  "cup-soda": CupSoda,
  coffee: Coffee,
  frame: Frame,
  notebook: NotebookPen,
  award: Award,
};

export function CategoryIcon({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  const Icon = ICONS[icon] ?? Gift;
  return <Icon className={className} aria-hidden="true" />;
}
