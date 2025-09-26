import { forwardRef, InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Input variants for different states and sizes
const inputVariants = cva(
  // Base styles
  "flex w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all placeholder:text-secondary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-secondary-300 focus-visible:ring-primary-500",
        error: "border-error-500 focus-visible:ring-error-500",
        success: "border-success-500 focus-visible:ring-success-500",
      },
      size: {
        default: "h-10",
        sm: "h-9 text-xs",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    label, 
    error, 
    helperText, 
    success, 
    required, 
    id, 
    ...props 
  }, ref) => {
    // Determine variant based on error/success state
    const computedVariant = error ? "error" : success ? "success" : variant;
    
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-secondary-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          className={cn(inputVariants({ variant: computedVariant, size, className }))}
          ref={ref}
          id={inputId}
          {...props}
        />
        
        {/* Helper text or error message */}
        {(error || helperText) && (
          <p className={cn(
            "text-xs",
            error ? "text-error-600" : "text-secondary-500"
          )}>
            {error || helperText}
          </p>
        )}
        
        {/* Success message */}
        {success && !error && (
          <p className="text-xs text-success-600">
            Looks good!
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea variant
export interface TextareaProps
  extends Omit<InputProps, "size"> {
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ 
    className, 
    variant, 
    label, 
    error, 
    helperText, 
    success, 
    required, 
    id,
    rows = 4,
    ...props 
  }, ref) => {
    const computedVariant = error ? "error" : success ? "success" : variant;
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-secondary-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          className={cn(
            inputVariants({ variant: computedVariant, className }),
            "min-h-[80px] resize-y"
          )}
          ref={ref}
          id={inputId}
          rows={rows}
          {...props}
        />
        
        {(error || helperText) && (
          <p className={cn(
            "text-xs",
            error ? "text-error-600" : "text-secondary-500"
          )}>
            {error || helperText}
          </p>
        )}
        
        {success && !error && (
          <p className="text-xs text-success-600">
            Looks good!
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Select variant
export interface SelectProps
  extends Omit<InputProps, "size"> {
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ 
    className, 
    variant, 
    label, 
    error, 
    helperText, 
    success, 
    required, 
    id,
    options,
    placeholder = "Select an option...",
    ...props 
  }, ref) => {
    const computedVariant = error ? "error" : success ? "success" : variant;
    const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-secondary-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <select
          className={cn(
            inputVariants({ variant: computedVariant, className }),
            "cursor-pointer"
          )}
          ref={ref}
          id={inputId}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {(error || helperText) && (
          <p className={cn(
            "text-xs",
            error ? "text-error-600" : "text-secondary-500"
          )}>
            {error || helperText}
          </p>
        )}
        
        {success && !error && (
          <p className="text-xs text-success-600">
            Looks good!
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select, inputVariants };