import { motion } from "framer-motion";
import { FaCheck, FaExclamation } from "react-icons/fa";

interface AlertProps {
  y: string;
  alertType: { status: string };
}

export const Alert = ({ y, alertType: { status } }: AlertProps) => {
  return (
    <>
      {status === "warning" && (
        <motion.div
          className="fixed right-5 flex items-center gap-x-2 p-4 bg-red-600 text-gray-100 text-sm rounded-lg shadow-lg shadow-gray-600"
          initial={{ y: "100vh" }}
          animate={{ y }}
        >
          <FaExclamation className="w-4 h-4" /> Please make sure you have filled
          out all fields correctly.
        </motion.div>
      )}
      {status === "success" && (
        <motion.div
          className="fixed right-5 flex items-center gap-x-2 p-4 bg-green-600 text-gray-100 text-sm rounded-lg shadow-lg shadow-gray-600"
          initial={{ y: "100vh" }}
          animate={{ y }}
        >
          <FaCheck className="w-4 h-4" /> Your changes have been successfully
          saved.
        </motion.div>
      )}
    </>
  );
};
