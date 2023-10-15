import { BsYoutube } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LinkboxProps {
  index: number;
}

function Linkbox({ index }: LinkboxProps) {
  return (
    <div className="bg-gray-200 p-5">
      <div className="flex justify-between">
        <span>Link #{index}</span>
        <span className="underline">Remove</span>
      </div>

      <span className="block mt-3 text-sm">Platform</span>

      <ToggleMenu />
    </div>
  );
}
export default Linkbox;

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

const ToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <motion.button
        className="flex justify-between items-center mx-auto px-5 py-1 text-black w-full rounded-lg border-2 border-green-700"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        Menu
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
            className="mt-1 absolute rounded-lg bg-green-600"
            variants={ulVariants}
            initial="initial"
            animate="open"
            exit="closed"
          >
            <motion.li
              className="h-10 text-white pt-2 pl-2"
              variants={liVariants}
            >
              asasda
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2"
              variants={liVariants}
            >
              dsadsadas
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2"
              variants={liVariants}
            >
              asdasd
            </motion.li>
            <motion.li
              className="h-10 text-white pt-2 pl-2"
              variants={liVariants}
            >
              sdsada
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
