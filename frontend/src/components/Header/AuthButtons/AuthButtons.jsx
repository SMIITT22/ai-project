import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AuthButtons = () => {
  return (
    <>
      <Link to="/login">
        <Button
          variant="text"
          size="sm"
          className="whitespace-nowrap bg-gray-300"
        >
          <span>Log In</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          variant="gradient"
          size="sm"
          color="black"
          className="whitespace-nowrap"
        >
          <span>Sign Up</span>
        </Button>
      </Link>
    </>
  );
};

export default AuthButtons;
