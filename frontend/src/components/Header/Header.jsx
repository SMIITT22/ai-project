import { Navbar, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../auth/authSlice";

const Header = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return null;
  }

  return (
    <div className="w-full">
      <Navbar className="sticky top-0 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium font-gloria"
          >
            QG
          </Typography>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Typography className="font-medium">
                  Welcome, {user.email}
                </Typography>
                <Button
                  variant="text"
                  size="sm"
                  className="whitespace-nowrap bg-red-300"
                  onClick={handleLogout}
                >
                  <span>Log Out</span>
                </Button>
              </>
            ) : (
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
                    color="green"
                    className="whitespace-nowrap"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
