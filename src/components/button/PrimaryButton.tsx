import React, { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  title?: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "blue-dark" | "blue-light" | "white" | "yellow-light";
  isLoading?: boolean;
  isWide?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
};

function PrimaryButton({
  title,
  onClick,
  disabled,
  variant = "blue-light",
  icon,
  isLoading,
  isWide,
  type,
}: ButtonProps) {
  function variantFunc() {
    if (variant === "blue-dark") {
      return "bg-[#024D6B] text-white hover:bg-[#0182B5]/90 border-[#5C382B]";
    } else if (variant === "blue-light") {
      return "bg-[#0182B5] text-white hover:bg-[#4BB0D9]/90 border-[#2F3B00]";
    } else if (variant === "white") {
      return "bg-[#FCFAF4] text-black hover:bg-[#FCFAF4]/90 border-[#2F3B00]";
    } else if (variant === "yellow-light") {
      return "bg-[#C7B14E] text-white hover:bg-[#C7B14E]/90 border-[#2F3B00]";``
    }
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${variantFunc()} ${
        isWide ? "w-full" : "px-5 md:px-6"
      } flex flex-row items-center justify-center whitespace-nowrap
      rounded-[20px] ring-offset-background primarybold text-center text-base md:text-lg lg:text-lg cursor-pointer
      transition-all duration-100 disabled:pointer-events-none disabled:opacity-50
      h-[40px] md:h-[50px] lg:h-[45px] `}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {title} {icon && icon}
        </>
      )}
    </button>
  );
}

export default PrimaryButton;
