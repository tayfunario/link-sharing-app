import { useState, useEffect } from "react";
import { Dashboard } from "../components/Dashboard";
import { Preview } from "../components/Preview";
import { Header } from "../components/Header";

export interface LinkProps {
  id: number;
  platform: string;
  url: string;
  icon: any;
}

export default function Home() {
  const [links, setLinks] = useState<LinkProps[]>([
    { id: 0, platform: "Choose a platform", url: "", icon: null },
  ]);

  const overrideLinks = (newLinks: LinkProps[]) => {
    setLinks(newLinks);
  };

  return (
    <div
      id="container"
      className="min-h-screen box-border font-Poppins p-5 pb-0"
    >
      <div className="grid grid-cols-5 auto-rows-min gap-5">
        <Header />
        <Preview links={links} />
        <Dashboard links={links} overrideLinks={overrideLinks} />
      </div>
    </div>
  );
}
