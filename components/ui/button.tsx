import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target',
  {
    variants: {
      variant: {
        default:
          'rounded-[2px] bg-neon-pink text-white hover:bg-pop active:bg-neon-magenta/90 shadow-neon-pink',
        outline:
          'rounded-[2px] border border-neon-pink/70 bg-transparent text-cream hover:border-neon-teal hover:bg-neon-teal/10 hover:text-white hover:shadow-neon-teal',
        ghost:
          'rounded-[2px] text-cream hover:bg-white/5 hover:text-neon-yellow',
        link: 'text-neon-pink underline-offset-4 hover:text-neon-teal hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-[2px] px-4',
        lg: 'h-12 rounded-[2px] px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
