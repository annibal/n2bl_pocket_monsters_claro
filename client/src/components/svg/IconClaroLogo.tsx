import type { ComponentProps } from "react";

export default function IconClaroLogo(props: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.229 10.58c3.44 0 6.229 2.78 6.229 6.21S10.668 23 7.228 23C3.789 23 1 20.22 1 16.79s2.789-6.21 6.229-6.21zm0 3.105a3.11 3.11 0 00-3.115 3.105 3.11 3.11 0 003.115 3.105 3.11 3.11 0 003.114-3.105 3.11 3.11 0 00-3.114-3.104z"
        fill="currentColor"
      />
      <path d="M22 16.968h-7.475v-2.839H22v2.839zM20.4 4.427l-7.064 7.043-2.014-2.007 7.065-7.044L20.4 4.427zM8.83 8.452H5.984V1h2.848v7.452z" fill="currentColor" />
    </svg>
  );
}
