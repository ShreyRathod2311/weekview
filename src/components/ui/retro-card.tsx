import * as React from "react"
import { cn } from "@/lib/utils"

const RetroCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative bg-background border-2 border-neon-cyan rounded-lg p-6 shadow-neon-glow",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-neon-cyan/5 before:to-neon-purple/5 before:rounded-lg before:-z-10",
      "after:absolute after:inset-0 after:border-2 after:border-neon-cyan/20 after:rounded-lg after:blur-sm after:-z-20",
      className
    )}
    {...props}
  />
))
RetroCard.displayName = "RetroCard"

const RetroCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 mb-4", className)}
    {...props}
  />
))
RetroCardHeader.displayName = "RetroCardHeader"

const RetroCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold text-neon-cyan tracking-wider uppercase",
      "text-shadow-neon",
      className
    )}
    {...props}
  />
))
RetroCardTitle.displayName = "RetroCardTitle"

const RetroCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
RetroCardDescription.displayName = "RetroCardDescription"

const RetroCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
))
RetroCardContent.displayName = "RetroCardContent"

const RetroCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-3 rounded-full bg-neon-cyan/10 w-fit",
      "shadow-lg shadow-neon-cyan/20",
      className
    )}
    {...props}
  />
))
RetroCardIcon.displayName = "RetroCardIcon"

export { RetroCard, RetroCardHeader, RetroCardTitle, RetroCardDescription, RetroCardContent, RetroCardIcon }