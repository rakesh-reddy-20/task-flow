import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/userContext";

export const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      {/* Left Section: Menu + Logo + Title */}
      <div className="flex items-center gap-3">
        <button
          className="block lg:hidden text-black"
          aria-label="Toggle sidebar"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <img
          src="/images.png"
          alt="Task Flow Logo"
          className="w-8 h-8 object-contain"
        />

        <h2 className="text-lg font-semibold text-black">Task Flow</h2>
      </div>

      {/* Right Section: Notification + Avatar */}
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-black">
          <FiBell className="text-xl" />
        </button>

        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
          <img
            src={
              user?.profileImageUrl?.trim()
                ? user.profileImageUrl
                : "/profile-picture.png"
            }
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile sidebar */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
