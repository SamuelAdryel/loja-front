import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const button = cva(
   "justify-center inline-flex items-center rounded-xl text-center border border-blue-400 transition-colors",
  {
    variants: {
      intent: {
        primary: "text-white hover:enabled:bg-blue-700 bg-blue-400",
        secondary: "bg-transparent text-blue-400 hover:enabled:bg-blue-400 hover:enabled:text-white",
      },
      size: {
        sm: "h-full text-sm py-1.5 px-4",
      },
      underline: { true: "underline", false: ""},
    },
    defaultVariants: {
      intent: "primary",
      size: "sm",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  href: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return (
    <a className={twMerge(button({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  )
}
