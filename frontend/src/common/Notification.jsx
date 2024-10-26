import { motion } from "framer-motion";
import { useEffect } from "react";

const Notification = ({ message, onClose, duration = 5000 }) => {
  // Framer Motion animation variants
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      className="fixed z-50 top-16 right-2 sm:top-20 sm:right-4 w-[90vw] max-w-sm sm:max-w-md p-3 sm:p-4 bg-black dark:bg-white text-white dark:text-black rounded-lg flex justify-between items-center shadow-lg font-poppins text-sm sm:text-base transition-colors duration-300 ease-in-out"
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
          className="ml-3 sm:ml-4 text-lg font-bold text-white dark:text-black focus:outline-none"
        >
          &times;
        </button>
      )}
    </motion.div>
  );
};

export default Notification;
