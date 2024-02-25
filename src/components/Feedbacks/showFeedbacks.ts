import { toast } from "react-toastify";
import "./showFeedbacks.css";

export const showFeedbacks = (message: string, type: "error" | "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 2500,
    theme: "dark",
    className: "toast",
  });
};
