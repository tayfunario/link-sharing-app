import { BsYoutube, BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillGithub, AiOutlineTwitter, AiOutlineLink } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LinkboxProps {
  index: number;
}

function Linkbox({ index }: LinkboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenPlatform, setChosenPlatform] =
    useState<string>("Choose a platform");
  const [chosenPlatformIcon, setChosenPlatformIcon] = useState(null);

  return (
    <div className="bg-gray-200 mb-12 p-5 rounded-md">
      <div className="flex justify-between">
        <span>Link #{index}</span>
        <span className="underline">Remove</span>
      </div>

      <span className="block mt-3 text-sm capitalize text-gray-600">
        Platform
      </span>
      <ToggleMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chosenPlatform={chosenPlatform}
        setChosenPlatform={setChosenPlatform}
        chosenPlatformIcon={chosenPlatformIcon}
        setChosenPlatformIcon={setChosenPlatformIcon}
      />
      <Input chosenPlatform={chosenPlatform} />
    </div>
  );
}

const ulVariants = {
  initial: {
    scale: 0,
    y: -50,
  },
  open: {
    scale: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.13,
    },
  },
  closed: {
    scale: 0,
    y: -50,
  },
};

const liVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

interface ToggleMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chosenPlatform: string;
  setChosenPlatform: (chosenPlatform: string) => void;
  chosenPlatformIcon: any;
  setChosenPlatformIcon: (chosenPlatformIcon: any) => void;
}

const ToggleMenu = ({
  isOpen,
  setIsOpen,
  chosenPlatform,
  setChosenPlatform,
  chosenPlatformIcon,
  setChosenPlatformIcon,
}: ToggleMenuProps) => {
  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if (!target.closest("#ul-menu") && !target.closest(".link-btn")) {
        setIsOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const btnWidth = document.querySelector(".link-btn")!.clientWidth;
      const ulElement = document.querySelector("#ul-menu") as HTMLUListElement;
      ulElement.style.width = `${btnWidth}px`;
    }
  }, [isOpen]);

  return (
    <div>
      <motion.button
        className="link-btn flex justify-between items-center bg-gray-100 px-5 py-2 w-full rounded-lg border-2 border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-x-2">
          {chosenPlatformIcon}
          {chosenPlatform}
        </div>
        <motion.svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="rgb(21 128 61)"
          data-open={isOpen}
          layout
        >
          <path d="M0 7 L 20 7 L 10 16" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="ul-menu"
            className="mt-1 absolute rounded-lg bg-green-600"
            variants={ulVariants}
            initial="initial"
            animate="open"
            exit="closed"
          >
            <motion.li
              className="h-10 text-white pt-2 pl-2 hover:bg-green-500"
              variants={liVariants}
              onClick={(e) => {
                setChosenPlatform("Youtube");
                setChosenPlatformIcon(<BsYoutube className="inline" />);
                setIsOpen(false);
              }}
            >
              <BsYoutube className="inline" /> Youtube
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2 hover:bg-green-500"
              variants={liVariants}
              onClick={() => {
                setChosenPlatform("Github");
                setChosenPlatformIcon(<AiFillGithub className="inline" />);
                setIsOpen(false);
              }}
            >
              <AiFillGithub className="inline" /> GitHub
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2 hover:bg-green-500"
              variants={liVariants}
              onClick={() => {
                setChosenPlatform("Instagram");
                setChosenPlatformIcon(<BsInstagram className="inline" />);
                setIsOpen(false);
              }}
            >
              <BsInstagram className="inline" /> Instagram
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2 hover:bg-green-500"
              variants={liVariants}
              onClick={() => {
                setChosenPlatform("Facebook");
                setChosenPlatformIcon(<BsFacebook className="inline" />);
                setIsOpen(false);
              }}
            >
              <BsFacebook className="inline" /> Facebook
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2 hover:bg-green-500"
              variants={liVariants}
              onClick={() => {
                setChosenPlatform("Twitter");
                setChosenPlatformIcon(<AiOutlineTwitter className="inline" />);
                setIsOpen(false);
              }}
            >
              <AiOutlineTwitter className="inline" /> Twitter
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Input = ({ chosenPlatform }: { chosenPlatform: string }) => {
  return (
    <div className="mt-5">
      <form>
        <label htmlFor="link" className="mt-3 text-sm capitalize text-gray-600">
          Link
        </label>
        <div className="flex items-center gap-x-2 bg-gray-11 rounded-lg px-5 py-2 bg-gray-100 border-2 border-gray-400">
          <AiOutlineLink />
          <input
            required
            type="text"
            id="link"
            className="grow bg-transparent focus:outline-none"
            placeholder={
              chosenPlatform === "Choose a platform"
                ? `https://www.github.com/`
                : `https://www.${chosenPlatform.toLowerCase()}.com/`
            }
            pattern={
              chosenPlatform === "Choose a platform"
                ? `https://www.github.com/[a-zA-Z0-9]+`
                : `https://www.${chosenPlatform.toLowerCase()}.com/[a-zA-Z0-9]+`
            }
          />
        </div>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Linkbox;
