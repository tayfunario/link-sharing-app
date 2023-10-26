import { useState, useEffect } from "react";
import Linkbox from "./Linkbox";
import { LinkProps } from "../pages";
import { motion } from "framer-motion";

interface DashboardProps {
  links: LinkProps[];
  overrideLinks: (newLinks: LinkProps[]) => void;
}

export const Dashboard = ({ links, overrideLinks }: DashboardProps) => {
  const [stagingLinks, setStagingLinks] = useState<LinkProps[]>(links);

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

  const removeLink = (index: number) => {
    const newStagingLinks = [...stagingLinks];
    newStagingLinks.splice(index, 1);
    setStagingLinks(newStagingLinks);
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
    <div className="relative pb-32 col-span-3 rounded-2xl bg-white overflow-hidden">
      <div className="p-12">
        <h3 className="text-2xl mb-2 font-semibold tracking-tighter">
          Customize Your Links
        </h3>
        <p className="text-sm text-gray-500">
          Add/edit/remove links below and then share all your profiles with
          world!
        </p>
        <motion.button
          className="text-green-700 font-normal w-full py-2 mt-5 rounded-lg border-2 border-green-500"
          onClick={addLink}
          whileTap={{ scale: 0.95 }}
        >
          + Add new link
        </motion.button>
      </div>

      <div className="flex flex-col gap-y-10 px-16">
        {stagingLinks.map((link, index) => (
          <Linkbox
            key={index}
            index={index}
            link={link}
            updateUrl={updateUrl}
            updatePlatform={updatePlatform}
            removeLink={removeLink}
          />
        ))}
      </div>

      <div
        id="dashboard-bottom-div"
        className="absolute bottom-0 bg-gray-100 w-full h-20 flex justify-end items-center px-10 rounded-b-3xl"
      >
        <motion.button
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
          onClick={() => overrideLinks(stagingLinks)}
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};
