import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        success: "border-transparent bg-status-success text-background hover:bg-status-success/80",
        warning: "border-transparent bg-status-warning text-background hover:bg-status-warning/80",
        error: "border-transparent bg-status-error text-foreground hover:bg-status-error/80",
        info: "border-transparent bg-status-info text-background hover:bg-status-info/80",
        "status-success": "border-transparent bg-status-success text-background",
        "status-warning": "border-transparent bg-status-warning text-background",
        "status-error": "border-transparent bg-status-error text-foreground",
        "status-info": "border-transparent bg-status-info text-background",
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
