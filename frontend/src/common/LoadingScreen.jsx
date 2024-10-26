import { Spinner } from "@material-tailwind/react";

export default function LoadingScreen({
  message = "Loading...",
  isLoading = true,
}) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 transition-colors duration-300">
      <div className="flex flex-col items-center">
        <Spinner className="h-12 w-12 mb-4 text-black dark:text-white" />
        <p className="text-gray-800 dark:text-gray-300 text-lg font-semibold">
          {message}
        </p>
      </div>
    </div>
  );
}
