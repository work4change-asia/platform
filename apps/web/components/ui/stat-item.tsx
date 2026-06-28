import { twMerge } from "tailwind-merge";

type StatItemProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <span className="text-h3 font-semibold text-cream">{value}</span>
      <span className="text-sm text-pale-blue">{label}</span>
    </div>
  );
}
