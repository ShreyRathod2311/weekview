import * as React from "react"
import { cn } from "@/lib/utils"

const SignInCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative bg-gradient-to-br from-background via-background/95 to-primary/5",
      "backdrop-blur-xl border border-border/50",
      "rounded-2xl shadow-2xl overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-primary-glow/5 before:rounded-2xl before:-z-10",
      className
    )}
    {...props}
  />
))
SignInCard.displayName = "SignInCard"

const SignInCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 text-center p-8 pb-4",
      className
    )}
    {...props}
  />
))
SignInCardHeader.displayName = "SignInCardHeader"

const SignInCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))
SignInCardTitle.displayName = "SignInCardTitle"

const SignInCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm leading-relaxed", className)}
    {...props}
  />
))
SignInCardDescription.displayName = "SignInCardDescription"

const SignInCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 pt-4", className)} {...props} />
))
SignInCardContent.displayName = "SignInCardContent"

const SignInCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-8 pt-0", className)}
    {...props}
  />
))
SignInCardFooter.displayName = "SignInCardFooter"

export {
  SignInCard,
  SignInCardHeader,
  SignInCardTitle,
  SignInCardDescription,
  SignInCardContent,
  SignInCardFooter,
}