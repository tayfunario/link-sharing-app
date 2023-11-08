import { motion, AnimatePresence } from "framer-motion";
import { LinkProps } from "../pages";
import { UserProps } from "../pages";
import { PreviewItem } from "./PreviewItem";

interface PreviewProps {
  links: LinkProps[];
  user: UserProps;
}

const svgVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  hidden: { y: 100 },
  visible: { y: 0 },
};

const staggerVariants = {
  visible: {
    transition: { staggerChildren: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const Preview = ({ user, links }: PreviewProps) => {
  return (
    <div className="col-span-2 flex justify-center max-h-screen bg-white rounded-2xl">
      <motion.div
        className="relative my-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <svg
          className="mx-auto"
          width="304"
          height="604"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            x="2"
            y="2"
            width="300"
            height="600"
            rx="30"
            ry="30"
            style={{ fill: "hsl(0, 0%, 95%)", stroke: "black" }}
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.rect
            x="17"
            y="17"
            width="270"
            height="570"
            rx="30"
            ry="30"
            style={{ fill: "white", stroke: "black" }}
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.circle
            cx="150"
            cy="555"
            r="20"
            style={{ fill: "white", stroke: "black" }}
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
        <motion.div
          className="absolute w-full top-[10%]"
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={user.imgPath}
            className="w-28 h-28 mx-auto mb-5 object-cover rounded-full border border-gray-300"
            variants={childVariants}
          />
          {user.firstname ? (
            <>
              <p className="text-center font-bold">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-center text-sm text-gray-600">{user.email}</p>
            </>
          ) : (
            <>
              <motion.div
                className="w-44 h-4 mx-auto bg-gray-200 rounded-xl mb-2"
                variants={childVariants}
              />
              <motion.div
                className="w-32 h-3 mx-auto bg-gray-200 rounded-xl"
                variants={childVariants}
              />
            </>
          )}
          <ul
            id="preview-items-list"
            className="pr-1 mx-auto mt-7 w-3/4 max-h-[260px] overflow-y-auto"
          >
            {links &&
              links.map((link) => <PreviewItem key={link.id} link={link} />)}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};
