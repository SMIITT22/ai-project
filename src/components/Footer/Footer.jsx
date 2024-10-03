import { Typography } from "@material-tailwind/react";
import Divider from "../../common/Divider";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <Divider />

      <div className="container mx-auto px-4 md:px-8 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0">
          {/* <div className="flex items-center md:mr-6">
            <div className=" text-white p-3 rounded-full">
              <Typography
                variant="h6"
                className="font-semibold text-black font-gloria"
              >
                QG
              </Typography>
            </div>
          </div> */}
          <div className="text-center md:text-left">
            <Typography
              variant="h6"
              className="font-semibold text-black font-POPPINS"
            >
              Questions Genrator
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Create Questions with AI, and do your practice.
            </Typography>
            <Typography variant="small" className="text-gray-500 mt-1">
              71-75, Shelton Street, Covent Garden, London, WC2H 9JQ, UK
            </Typography>
            <Typography variant="small" className="text-gray-500 mt-1">
              © 2024 QG AI – All rights reserved.
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
