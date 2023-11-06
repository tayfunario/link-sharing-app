import { PiInfinityFill, PiLinkBold, PiUserCircleBold } from "react-icons/pi";

interface HeaderProps {
  handleDashboard: (val: boolean) => void;
  isDashboard: boolean;
}

export function Header({ isDashboard, handleDashboard }: HeaderProps) {
  console.log(isDashboard)
  return (
    <header className="relative col-span-5 flex justify-center items-center gap-x-8 h-16 bg-white rounded-2xl">
      <div className="absolute flex items-center left-5">
        <PiInfinityFill className="w-10 h-10 text-green-600" />{" "}
        <span className="text-3xl font-black tracking-tighter">devlinks</span>
      </div>
      <button
        className={`flex items-center gap-x-2 text-green-900 ${isDashboard ? "bg-green-300": "bg-green-50"} py-2 px-3 rounded-lg`}
        onClick={() => handleDashboard(true)}
      >
        <PiLinkBold /> Links
      </button>
      <button
        className={`flex items-center gap-x-2 text-green-900 ${isDashboard ? "bg-green-50" : "bg-green-300"}  py-2 px-3 rounded-lg`}
        onClick={() => handleDashboard(false)}
      >
        <PiUserCircleBold /> Profile Details
      </button>
    </header>
  );
}
