import { useState, RefObject, useEffect } from "react";
import { AnimatePresence, useCycle } from "framer-motion";
import { Dashboard } from "../components/Dashboard";
import { Preview } from "../components/Preview";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { Alert } from "../components/Alert";
import { ClipboardAlert } from "../components/ClipboardAlert";
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
  const [bottom, cycleBottom] = useCycle(-100, 40);
  const [clipboardBottom, cycleClipboardBottom] = useCycle(-100, 30);
  const [alertType, setAlertType] = useState<{ status: string | null }>({
    status: null,
  });
  const [isDashboard, setIsDashboard] = useState<boolean>(true);
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [user, setUser] = useState<UserProps>({
    imgPath: blank.src,
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    handleCycle(false);
  }, [alertType]);

  const handleDashboard = (val: boolean) => {
    setIsDashboard(val);
  };

  const overrideLinks = (newLinks: LinkProps[]) => {
    for (let i in newLinks) {
      const regexPattern = `https://www.${newLinks[
        i
      ].platform.toLowerCase()}.com/[a-zA-Z0-9]+`;
      const linkboxes = document.querySelectorAll(".linkbox");
      if (!newLinks[i].url.match(regexPattern)) {
        linkboxes[i].classList.add("border-red-500");
        setAlertType({ status: "warning" });
        setTimeout(() => {
          linkboxes[i].classList.remove("border-red-500");
        }, 1000);
        return;
      }
    }

    if (newLinks.length === 0 && links.length === 0) {
      return;
    }

    setLinks(newLinks);
    setAlertType({ status: "success" });
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
    setAlertType({ status: "success" });
  };

  const drawAlert = (ref: RefObject<HTMLDivElement>) => {
    setAlertType({ status: "warning" });
    ref.current.classList.remove("border-transparent");
    ref.current.classList.add("border-red-500");
    setTimeout(() => {
      ref.current.classList.add("border-transparent");
      ref.current.classList.remove("border-red-500");
    }, 1000);
  };

  const handleCycle = (isClipboard: boolean) => {
    if (isClipboard) {
      cycleClipboardBottom();
      setTimeout(() => {
        cycleClipboardBottom();
      }, 2000);
    } else {
      cycleBottom();
      setTimeout(() => {
        cycleBottom();
      }, 2000);
    }
  };

  return (
    <div
      id="container"
      className="min-h-screen max-w-[100vw] overflow-hidden box-border font-Poppins lg:p-5 pb-5"
    >
      <div className="md:grid grid-cols-5 lg:gap-x-5 gap-x-1">
        <Header isDashboard={isDashboard} handleDashboard={handleDashboard} />
        <Preview user={user} links={links} handleCycle={handleCycle} />
        <AnimatePresence mode="wait">
          {isDashboard ? (
            <Dashboard
              key="dashboard"
              links={links}
              overrideLinks={overrideLinks}
            />
          ) : (
            <Profile key="profile" user={user} overrideUser={overrideUser} />
          )}
        </AnimatePresence>
        <ClipboardAlert bottom={clipboardBottom} />
        <Alert bottom={bottom} alertType={alertType} />
      </div>
    </div>
  );
}
