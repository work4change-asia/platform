"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { SearchIcon } from "@/components/ui/icons";

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ className, placeholder = "Type here...", ...props }: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <div
      className={twMerge(
        "flex h-14 items-center gap-3 rounded-pill border border-pale-blue bg-white px-6 text-pale-blue",
        className,
      )}
    >
      <SearchIcon size={20} />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-charcoal placeholder:text-pale-blue focus:outline-none"
        {...props}
      />
    </div>
  );
}
