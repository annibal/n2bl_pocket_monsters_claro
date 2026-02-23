import type { ComponentProps } from "react";

export default function IconFilter(props: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    d="M17.343 8.657l3.243-3.243a1.414 1.414 0 00-1-2.414H4.414a1.414 1.414 0 00-1 2.414l3.243 3.243A8 8 0 019 14.314v4.979A1.707 1.707 0 0010.707 21h2.586A1.707 1.707 0 0015 19.293v-4.98a8 8 0 012.343-5.656z"
    fill="currentColor" />
</svg>
  );
}
