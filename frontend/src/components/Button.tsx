import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
    "text-nowrap flex justify-center items-center cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white",
                secondary: "bg-secondary text-text-secondary"
            },
            size: {
                md: "px-3 py-2 rounded-lg text font-normal"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md"
        }
    }
)

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    leftIcon?: React.ReactNode,
}

function Button({
    className,
    variant,
    size,
    leftIcon,
    children,
    ...props
}: ButtonType) {
  return (
    <>
        <button className={cn(buttonVariants({variant, size}), className)} {...props}>
            {leftIcon && <span className="pr-2">{leftIcon}</span>}
            {children}
        </button>
    </>
  )
}

export default Button