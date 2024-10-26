import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AuthButtons = () => {
  return (
    <>
      <Link to="/login">
        <Button
          variant="text"
          size="sm"
          className="whitespace-nowrap bg-gray-300 dark:bg-gray-700 dark:text-white"
        >
          <span>Log In</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          variant="gradient"
          size="sm"
          color="black"
          className="whitespace-nowrap dark:bg-gray-800 dark:hover:bg-gray-900 transition-colors"
        >
          <span>Sign Up</span>
        </Button>
      </Link>
    </>
  );
};

export default AuthButtons;
