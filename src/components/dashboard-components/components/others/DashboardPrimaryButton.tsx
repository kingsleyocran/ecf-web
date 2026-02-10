import { checkColorBrightness } from "@/utils/helpers";
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

export default function DashboardPrimaryButton({
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
  let onThemeColor = checkColorBrightness(buttonColor);

  return (
    <button
      disabled={disabled}
      onClick={onClicked}
      type={type}
      style={{
        backgroundColor: buttonColor,
        color: buttonColor ? checkColorBrightness(buttonColor) : "black",
      }}
      className={`${additionalClassname} ${
        isWide ? "w-full" : "px-8"
      } flex flex-row justify-center items-center ${
        rounded ? "rounded-full" : "rounded-lg"
      } ${
        disabled
          ? "cursor-not-allowed opacity-30"
          : "active:scale-[99%] hover:scale-[105%]"
      } h-[45px] md:h-[45px] ${`${themeColor} ${onThemeColor}`}  paragraph-text transition-all duration-200 whitespace-nowrap`}
    >
      {isLoading ? (
        <Spin
          style={{
            color: buttonColor ? checkColorBrightness(buttonColor) : "black",
          }}
          className={`${onThemeColor} font-black`}
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
