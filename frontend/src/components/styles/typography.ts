import { cva } from "class-variance-authority";

export const textVariants = cva (
    "", {
    variants: {
        variant: {
            h1: "text-2xl font-bold",
            h2: "text-xl font-bold",
            title: "text-md font-medium"
        }
    }
    }
)