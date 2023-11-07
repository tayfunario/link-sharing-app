import { HiArrowRight } from "react-icons/hi";
import { LinkProps } from "../pages";

export const PreviewItem = ({ link }: { link: LinkProps }) => {
  let bgColor: string;
  let hoverBgColor: string;

  if (link.platform === "Facebook") {
    bgColor = "bg-blue-500";
    hoverBgColor = "bg-blue-600";
  } else if (link.platform === "Instagram") {
    bgColor = "bg-pink-500";
    hoverBgColor = "bg-pink-600";
  } else if (link.platform === "Twitter") {
    bgColor = "bg-sky-500";
    hoverBgColor = "bg-sky-600";
  } else if (link.platform === "LinkedIn") {
    bgColor = "bg-blue-700";
    hoverBgColor = "bg-blue-800";
  } else if (link.platform === "Youtube") {
    bgColor = "bg-red-500";
    hoverBgColor = "bg-red-600";
  } else if (link.platform === "Github") {
    bgColor = "bg-gray-700";
    hoverBgColor = "bg-gray-800";
  }

  return (
    <li>
      <a
        href={link.url}
        target="_blank"
        className={`flex justify-between items-center p-3 mb-3 rounded-xl text-white ${bgColor} hover:${hoverBgColor}`}
      >
        <div className="flex items-center gap-x-2 text-sm">
          <div className="text-xl">{link.icon}</div> {link.platform}
        </div>
        <HiArrowRight className={`${hoverBgColor} rounded-full w-5 h-5 p-[2px]`} />
      </a>
    </li>
  );
};
