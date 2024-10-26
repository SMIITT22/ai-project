import { Typography } from "@material-tailwind/react";
import Divider from "../../common/Divider";

const Footer = () => {
  return (
    <>
      <Divider className="border-gray-300 dark:border-gray-700" />
      <footer className="bg-white dark:bg-gray-900 py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <Typography
                variant="h6"
                className="font-semibold text-black dark:text-white font-poppins"
              >
                Questions Generator
              </Typography>
              <Typography
                variant="small"
                className="text-gray-500 dark:text-gray-400 mt-1"
              >
                Create Questions with AI, and do your practice.
              </Typography>
              <Typography
                variant="small"
                className="text-gray-500 dark:text-gray-400 mt-1"
              >
                © 2024 QG AI – All rights reserved.
              </Typography>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
