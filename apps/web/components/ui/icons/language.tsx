import type { IconProps } from "./icon";

export function LanguageIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="587 671 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M594 694.5H602.856C603.461 694.5 603.928 693.966 603.847 693.366L601.617 676.866C601.55 676.37 601.127 676 600.626 676H594C592.895 676 592 676.895 592 678V692.5C592 693.605 592.895 694.5 594 694.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M602 680.5H612C613.105 680.5 614 681.395 614 682.5V696.5C614 697.605 613.105 698.5 612 698.5H602.062C601.144 698.5 600.344 697.875 600.121 696.985L599.5 694.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M603 694.5L600 697.5" stroke="currentColor" strokeWidth="1.5" />
          <g>
            <g>
              <path
                d="M605.4 687L611.4 687"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M608.4 685.5V687"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
            <g>
              <path
                d="M606.5 687C606.833 688.333 608.1 691.3 610.5 692.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M610 687.5C609.667 688.712 608.4 691.409 606 692.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </g>
          <g>
            <path
              d="M595 688.5L596.353 681.735C596.438 681.308 596.814 681 597.25 681C597.686 681 598.062 681.308 598.147 681.735L599.5 688.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M596 685.5H598.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
