import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./type";

export function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "rounded-[10px] transition-all duration-100 py-3 bg-orange-2 w-full hover:bg-orange-1 font-semibold text-white",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function DeleteButton(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "rounded-[10px] transition-all duration-100 py-3 bg-red-500 w-full hover:bg-red-600 font-semibold text-white",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function CancelButton(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "rounded-[10px] transition-all duration-100 py-3 bg-white border-2 font-semibold w-full hover:bg-orange-100 border-orange-2 text-orange-2 ",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function NumButton(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button
      className={twMerge(
        "text-3xl rounded-[10px] transition-all duration-100 py-3 text-[#9A97DA] bg-white border-2 font-semibold w-full h-[10svh] hover:bg-[#9A97DA] hover:text-white active:border active:border-[#9A97DA] active:bg-white active:text-[#9A97DA] ",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}