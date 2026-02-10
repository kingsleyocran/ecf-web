import toast from "react-hot-toast";

type Props = {
  message: string;
  duration?: number;
};

function ErrorToast({ message, duration = 3000 }: Props) {
  return toast.error(message, {
    duration: duration,
    position: "top-center",
    style: {

    },
    // iconTheme: {
    //   primary: "#54A2AC",
    //   secondary: "#FFFAEE",
    // },
  });
}

export default ErrorToast;
