import { motion } from "framer-motion";
import { PiInfinityFill, PiLinkBold, PiUserCircleBold } from "react-icons/pi";

interface HeaderProps {
  handleDashboard: (val: boolean) => void;
  isDashboard: boolean;
}

export function Header({ isDashboard, handleDashboard }: HeaderProps) {
  return (
    <motion.header
      className="relative col-span-5 flex lg:justify-center justify-end items-center md:gap-x-8 gap-x-4 h-16 px-6 mb-4 lg:mt-0 mt-4 bg-white rounded-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="absolute flex items-center left-5">
        <PiInfinityFill className="lg:w-10 md:w-9 w-8 h-auto text-green-600" />{" "}
        <span className="lg:text-3xl text-xl font-black tracking-tighter">
          devlinks
        </span>
      </div>
      <button
        className={`flex items-center gap-x-2 text-green-900 ${
          isDashboard ? "bg-green-300" : "bg-green-50 hover:bg-green-100"
        } py-2 px-3 rounded-lg`}
        onClick={() => handleDashboard(true)}
      >
        <PiLinkBold /> <span className="sm:block hidden">Links</span>
      </button>
      <button
        className={`flex items-center gap-x-2 text-green-900 ${
          isDashboard ? "bg-green-50 hover:bg-green-100" : "bg-green-300"
        }  py-2 px-3 rounded-lg`}
        onClick={() => handleDashboard(false)}
      >
        <PiUserCircleBold /> <span className="sm:block hidden">Profile Details</span>
      </button>
    </motion.header>
  );
}
