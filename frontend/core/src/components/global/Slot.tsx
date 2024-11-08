import React, { forwardRef } from "react";

// libraries
import { twMerge } from "tailwind-merge";

// types
export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: React.ReactNode };

const Slot = forwardRef(
  (
    {
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      children?: React.ReactNode;
    },
    ref
  ) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        style: {
          ...props.style,
          ...children.props.style,
        },
        className: twMerge(props.className, children.props.className),
        ref, // Forward the ref to the child
      });
    }
    if (React.Children.count(children) > 1) {
      React.Children.only(null);
    }
    return null;
  }
);
Slot.displayName = "Slot";

export default Slot;
