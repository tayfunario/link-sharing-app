import { useState, useEffect, RefObject } from "react";
import { Dashboard } from "../components/Dashboard";
import { Preview } from "../components/Preview";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import blank from "../public/blank.webp";

export interface LinkProps {
  id: number;
  platform: string;
  url: string;
  icon: any;
}

export interface UserProps {
  imgPath: string;
  firstname: string;
  lastname: string;
  email: string;
}

export default function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [user, setUser] = useState<UserProps>({
    imgPath: blank.src,
    firstname: "",
    lastname: "",
    email: "",
  });

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

  const overrideUser = (newUser: UserProps, ref: RefObject<HTMLDivElement>) => {
    let regexPattern = /^[a-zA-Z]+[a-zA-Z\s]*$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!newUser.firstname.match(regexPattern)) {
      drawAlert(ref);
      return;
    } else if (!newUser.lastname.match(regexPattern)) {
      drawAlert(ref);
      return;
    } else if (!newUser.email.match(emailRegex)) {
      drawAlert(ref);
      return;
    }
    setUser(newUser);
  };

  const drawAlert = (ref: RefObject<HTMLDivElement>) => {
    ref.current.classList.remove("border-transparent");
    ref.current.classList.add("border-red-500");
    setTimeout(() => {
      ref.current.classList.add("border-transparent");
      ref.current.classList.remove("border-red-500");
    }, 1000);
  };

  return (
    <div id="container" className="min-h-screen box-border font-Poppins p-5">
      <div className="grid grid-cols-5 gap-5">
        <Header />
        <Preview user={user} links={links} />
        <Dashboard links={links} overrideLinks={overrideLinks} />
        <Profile user={user} overrideUser={overrideUser} />
      </div>
    </div>
  );
}
