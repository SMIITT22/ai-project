import { Navbar, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import ProfileMenu from "./Profile/ProfileMenu";
import AuthButtons from "./AuthButtons/AuthButtons";
import LoadingScreen from "../../common/LoadingScreen";
import {
  selectIsAuthenticated,
  selectLoading,
  selectUser,
} from "../../auth/authSlice";

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <div className="w-full">
      <Navbar className="fixed top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-black transition-colors duration-300 ease-in-out">
        <div className="flex items-center justify-between text-blue-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium font-gloria text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out"
          >
            QG
          </Typography>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <ProfileMenu userEmail={user.email} />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
