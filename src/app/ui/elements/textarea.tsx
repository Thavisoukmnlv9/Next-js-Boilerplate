import * as React from "react";

import { cn } from "../lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        const textareaRef = React.useRef(null);
        React.useLayoutEffect(() => {
            const resizeTextarea = () => {
              if (textareaRef.current) {
                (textareaRef.current as any).style.height = 'auto'; // Reset height
                (textareaRef.current  as any).style.height = `${(textareaRef.current  as any).scrollHeight}px`; // Set new height
              }
            };
        
            resizeTextarea();
          }, [props.value]);
        return (
            <textarea
                className={cn(
                    "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref ?? textareaRef}
                {...props}
            />
        );
    },
);
Textarea.displayName = "Textarea";

export { Textarea };
