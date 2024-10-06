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
      <Navbar className="sticky top-0 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium font-gloria"
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
