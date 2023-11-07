import { useState } from "react";
import Linkbox from "./Linkbox";
import { LinkProps } from "../pages";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

interface DashboardProps {
  links: LinkProps[];
  overrideLinks: (newLinks: LinkProps[]) => void;
}

export const Dashboard = ({ links, overrideLinks }: DashboardProps) => {
  const [stagingLinks, setStagingLinks] = useState<LinkProps[]>(links);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setStagingLinks((links) => {
        const oldIndex = links.findIndex((l) => l.id === active.id);
        const newIndex = links.findIndex((l) => l.id === over.id);
        return arrayMove(links, oldIndex, newIndex);
      });
    }
  };

  const addLink = () => {
    setStagingLinks([
      ...stagingLinks,
      {
        id: stagingLinks.length + 1,
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

  const updateIcon = (index: number, icon: any) => {
    const newLinks = [...stagingLinks];
    newLinks[index].icon = icon;
    setStagingLinks(newLinks);
  };

  return (
    <motion.div
      className="relative pb-36 col-span-3 rounded-2xl bg-white overflow-hidden"
      initial={{ x: "101vh" }}
      animate={{ x: 0 }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-12">
        <h2 className="text-2xl mb-2 font-semibold tracking-tighter">
          Customize Your Links
        </h2>
        <p className="text-gray-600">
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

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={stagingLinks}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-y-10 px-16">
            {stagingLinks.map((link, index) => (
              <Linkbox
                key={index}
                index={index}
                link={link}
                updateUrl={updateUrl}
                updatePlatform={updatePlatform}
                updateIcon={updateIcon}
                removeLink={removeLink}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
    </motion.div>
  );
};
