import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";

const Heading = ({ currentPhrase }) => (
  <div className="text-center mb-8">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Typography
        variant="h1"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins text-black"
      >
        {currentPhrase}
      </Typography>
    </motion.div>
  </div>
);

export default Heading;
