import { motion } from "framer-motion";
import { useEffect } from "react";

const Notification = ({
  message,
  type = "error",
  onClose,
  duration = 5000,
}) => {
  // Determine the color based on the type
  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";
  const borderColor =
    type === "success" ? "border-green-400" : "border-red-400";

  // Framer Motion animation variants
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  // Automatically close the notification after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Clear the timer if the component is unmounted before the duration ends
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      className={`fixed z-50 top-16 right-2 sm:top-20 sm:right-4 w-[90vw] max-w-sm sm:max-w-md p-3 sm:p-4 border-l-4 ${bgColor} ${textColor} ${borderColor} rounded-md flex justify-between items-center shadow-lg font-poppins text-sm sm:text-base`}
      role="alert"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 sm:ml-4 text-lg font-bold focus:outline-none"
        >
          &times;
        </button>
      )}
    </motion.div>
  );
};

export default Notification;
