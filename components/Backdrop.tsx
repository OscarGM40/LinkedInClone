import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  onClick: React.EventHandler<any>;
}
const Backdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      className="absolute top-0 left-0 h-full w-full overflow-y-scroll bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;