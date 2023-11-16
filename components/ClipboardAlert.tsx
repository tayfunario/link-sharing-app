import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface ClipboardAlertProps {
  bottom: number;
}

export const ClipboardAlert = ({ bottom }: ClipboardAlertProps) => {
  return (
    <motion.div
      className="fixed left-5 flex items-center gap-x-2 p-4 bg-blue-600 text-gray-100 text-sm rounded-lg shadow-lg shadow-gray-600"
      data-cy="clipboard-alert"
      initial={{ bottom: -100 }}
      animate={{ bottom }}
    >
      <AiOutlineInfoCircle className="w-5 h-5" /> Link copied to clipboard.
    </motion.div>
  );
};
