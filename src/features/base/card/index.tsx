import { twMerge } from "tailwind-merge";
import { CardProps } from "./type";

export function Card(props: CardProps) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={twMerge(
        "p-4 w-full bg-white border border-gray-6 rounded-[10px] shadow-md",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function LoginCard(props: CardProps) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={twMerge(
        "p-4 w-full border-t border-white/50",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}