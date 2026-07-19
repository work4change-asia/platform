import { twMerge } from "tailwind-merge";
import { badgeVariants } from "./badge";
import { CloseIcon } from "./icons";

export type SelectedFilterPillProps = {
  label: string;
  onRemove: () => void;
  className?: string;
};

export function SelectedFilterPill({ label, onRemove, className }: SelectedFilterPillProps) {
  return (
    <span
      className={twMerge(
        badgeVariants({ variant: "filter" }),
        "py-1.5 pr-2 pl-3 text-sm",
        className,
      )}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="rounded-full text-brown transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown"
      >
        <CloseIcon size={14} />
      </button>
    </span>
  );
}
