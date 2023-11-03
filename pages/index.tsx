import { useState, useEffect } from "react";
import { Dashboard } from "../components/Dashboard";
import { Preview } from "../components/Preview";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";

export interface LinkProps {
  id: number;
  platform: string;
  url: string;
  icon: any;
}

export default function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);

  const overrideLinks = (newLinks: LinkProps[]) => {
    for (let i in newLinks) {
      const regexPattern = `https://www.${newLinks[
        i
      ].platform.toLowerCase()}.com/[a-zA-Z0-9]+`;
      const linkboxes = document.querySelectorAll(".linkbox");
      if (!newLinks[i].url.match(regexPattern)) {
        linkboxes[i].classList.add("border-red-500");
        setTimeout(() => {
          linkboxes[i].classList.remove("border-red-500");
        }, 1000);
        return;
      }
    }
    setLinks(newLinks);
  };

  return (
    <div id="container" className="min-h-screen box-border font-Poppins p-5">
      <div className="grid grid-cols-5 gap-5">
        <Header />
        <Preview links={links} />
        {/* <Dashboard links={links} overrideLinks={overrideLinks} /> */}
        <Profile />
      </div>
    </div>
  );
}
