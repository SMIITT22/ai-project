import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../auth/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";

const ProfileMenu = ({ userEmail = "" }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch(logoutUser());
  };

  const truncatedEmail =
    userEmail?.length > 20
      ? `${userEmail.substring(0, 17)}...`
      : userEmail || "Guest";

  return (
    <div className="relative font-poppins">
      <Menu open={open} handler={handleMenu} placement="bottom-end">
        <MenuHandler>
          <button
            onClick={handleMenu}
            className="cursor-pointer text-gray-800 font-medium"
          >
            <FaUserCircle className="w-8 h-8 text-gray-800" />
          </button>
        </MenuHandler>
        <MenuList className="absolute z-10 min-w-[150px] max-w-[200px] overflow-auto rounded-md border border-gray-300 bg-white p-1 shadow-md focus:outline-none">
          <Typography className="p-2 text-gray-800 text-sm font-medium cursor-default">
            {truncatedEmail}
          </Typography>
          <hr className="my-1 border-gray-300" />
          <MenuItem
            className="flex items-center p-2 transition-all hover:bg-slate-100"
            onClick={() => {
              setOpen(false);
              navigate("/generations");
            }}
          >
            <BsStars className="w-4 h-4 text-gray-800" />
            <Typography className="ml-2 text-gray-800 text-sm font-medium">
              Generations
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center p-2 transition-all hover:bg-slate-100"
            onClick={() => {
              setOpen(false);
              navigate("/pricing");
            }}
          >
            <RiMoneyRupeeCircleFill className="w-4 h-4 text-gray-800" />
            <Typography className="ml-2 text-gray-800 text-sm font-medium">
              Pricing
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center p-2 transition-all hover:bg-slate-100"
            onClick={() => {
              setOpen(false);
              navigate("/settings");
            }}
          >
            <IoSettingsSharp className="w-4 h-4 text-gray-800" />
            <Typography className="ml-2 text-gray-800 text-sm font-medium">
              Settings
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center p-2 transition-all hover:bg-slate-100"
            onClick={() => {
              setOpen(false);
              navigate("/support");
            }}
          >
            <BiSupport className="w-4 h-4 text-gray-800" />
            <Typography className="ml-2 text-gray-800 text-sm font-medium">
              Support
            </Typography>
          </MenuItem>
          <hr className="my-1 border-gray-300" />
          <MenuItem
            className="flex items-center p-2 transition-all hover:bg-slate-100"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="w-4 h-4 text-gray-800" />
            <Typography className="ml-2 text-gray-800 text-sm font-medium">
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
