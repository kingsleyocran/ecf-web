import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

type Props = {
  isLoading?: boolean;
  onClicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isWide?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  title: string;
  buttonColor?: string;
  additionalClassname?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

export default function DashboardButton({
  isLoading = false,
  onClicked,
  isWide = true,
  title,
  disabled = false,
  rounded = false,
  type = "button",
  buttonColor = "black",
  additionalClassname,
}: Props) {
  let themeColor = `bg-[${buttonColor}]`;

  return (
    <button
      disabled={disabled}
      onClick={onClicked}
      type={type}
      style={{
        backgroundColor: buttonColor,
        color: buttonColor ? "white": "black",
      }}
      className={`${additionalClassname} ${
        isWide ? "w-full" : "px-8"
      } flex flex-row justify-center items-center ${
        rounded ? "rounded-full" : "rounded-lg"
      } ${
        disabled
          ? "cursor-not-allowed opacity-30"
          : "active:scale-[99%] hover:scale-[105%]"
      } h-[40px] md:h-[40px] ${`${themeColor} text-white`} font-semibold  text-sm transition-all duration-200 whitespace-nowrap`}
    >
      {isLoading ? (
        <Spin
          style={{
            color: buttonColor ? "white": "black",
          }}
          className={`text-white font-black`}
          indicator={
            <LoadingOutlined style={{ fontSize: 18 }} spin rev={undefined} />
          }
        />
      ) : (
        title
      )}
    </button>
  );
}
