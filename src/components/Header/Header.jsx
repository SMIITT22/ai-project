import { Navbar, Typography, Button } from "@material-tailwind/react";

const Header = () => {
  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium font-gloria"
          >
            Question Generator
          </Typography>
          <div className="flex items-center gap-4">
            <Button variant="outlined" size="sm" className="whitespace-nowrap">
              <span>Log In</span>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              color="green"
              className="whitespace-nowrap"
            >
              <span>Sign Up</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
