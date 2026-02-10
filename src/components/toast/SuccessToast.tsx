import toast from "react-hot-toast";

type Props = {
  message: string;
  duration?: number;
};

function SuccessToast({ message, duration = 3000 }: Props) {
  return toast.success(message, {
    duration: duration,
    position: "top-center",
    style: {
    },
    iconTheme: {
      primary: "#54A2AC",
      secondary: "#FFFAEE",
    },
  });
}

export default SuccessToast;
