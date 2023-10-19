import { useState, useEffect } from "react";
import Linkbox from "./Linkbox";
import { BsYoutube, BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillGithub, AiOutlineTwitter, AiOutlineLink } from "react-icons/ai";
import { LinkProps } from "../pages";

interface DashboardProps {
  links: LinkProps[];
  overrideLinks: (newLinks: LinkProps[]) => void;
}

export const Dashboard = ({ links, overrideLinks }: DashboardProps) => {
  const [stagingLinks, setStagingLinks] = useState<LinkProps[]>(links);
  useEffect(() => {
    setStagingLinks(links);
  }, []);

  const addLink = () => {
    setStagingLinks([
      ...stagingLinks,
      {
        id: stagingLinks.length,
        platform: "Choose a platform",
        url: "",
        icon: null,
      },
    ]);
  };

  const updateUrl = (index: number, url: string) => {
    const newLinks = [...stagingLinks];
    newLinks[index].url = url;
    setStagingLinks(newLinks);
  };

  const updatePlatform = (index: number, platform: string) => {
    const newLinks = [...stagingLinks];
    newLinks[index].platform = platform;
    setStagingLinks(newLinks);
  };

  return (
    <div className="relative pb-32 col-span-3 rounded-3xl bg-white">
      <div className="p-12">
        <h3 className="text-2xl mb-2 font-semibold tracking-tighter">
          Customize Your Links
        </h3>
        <p className="text-sm text-gray-500">
          Add/edit/remove links below and then share all your profiles with
          world!
        </p>
        <button
          className="text-green-700 font-normal w-full py-2 mt-5 rounded-lg border-2 border-green-500"
          onClick={addLink}
        >
          + Add new link
        </button>
      </div>

      <div className="flex flex-col gap-y-10 px-16">
        {stagingLinks.map((link, index) => (
          <Linkbox
            key={index}
            index={index}
            updateUrl={updateUrl}
            updatePlatform={updatePlatform}
          />
        ))}
      </div>

      <div className="absolute bottom-0 bg-gray-100 w-full h-20 flex justify-end items-center px-10 shadow-md">
        <button
          className="px-5 py-3 rounded-lg border-2 border-green-500"
          onClick={() => overrideLinks(stagingLinks)}
        >
          Save
        </button>
      </div>
    </div>
  );
};
