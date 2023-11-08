import { motion } from "framer-motion";

interface AlertProps {
  y: string;
  cycleY: () => void;
}

export const Alert = ({ y, cycleY }: AlertProps) => {
  return (
    <div className="fixed flex justify-center w-full">
      <motion.div
        className="p-4 bg-black text-gray-200 text-sm rounded-lg shadow-lg shadow-gray-600"
        animate={{ y }}
      >
        Please make sure you have filled out all fields correctly.
      </motion.div>
    </div>
  );
};
