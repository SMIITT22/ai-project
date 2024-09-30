import { useState, useEffect } from "react";
import {
  Navbar,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-x-1">
              <Button variant="text" size="sm">
                <span>Log In</span>
              </Button>
              <Button variant="gradient" size="sm">
                <span>Sign in</span>
              </Button>
            </div>
            {/* Use Menu for Mobile Nav */}
            <Menu>
              <MenuHandler>
                <IconButton
                  variant="text"
                  className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                  ripple={false}
                  onClick={() => setOpenNav(!openNav)}
                >
                  {openNav ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </IconButton>
              </MenuHandler>
              <MenuList className="lg:hidden">
                <div className="pb-2">
                  <Button fullWidth variant="text" size="sm" className="py-2">
                    <span className="font-poppins text-center">Log In</span>
                  </Button>
                </div>
                <div>
                  <Button
                    fullWidth
                    variant="gradient"
                    size="sm"
                    className="py-2"
                  >
                    <span className="font-poppins text-center">Sign In</span>
                  </Button>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
