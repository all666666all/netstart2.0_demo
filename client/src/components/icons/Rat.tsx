import * as React from "react";

export function RatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* head */}
      <circle cx="8" cy="7" r="2" />
      {/* ear */}
      <circle cx="6.2" cy="5.5" r="1" />
      {/* body */}
      <path d="M2 12c2-4 8-6 12-2 2 2 2 5 0 7H7c-2 0-4-2-5-5z" />
      {/* eye / snout */}
      <path d="M10 9l2 2" />
      {/* tail */}
      <path d="M18 13c2 0 3 1 3 3s-1 3-3 3" />
    </svg>
  );
}

