import { FaInstagram, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { IoLogoYoutube } from "react-icons/io";
import { motion } from "framer-motion";

export const assetTypeIcons = {
  instagram: (
    <motion.div animate={{ scale: 1.25 }} transition={{ duration: 1 }}>
      <FaInstagram className="dashboard-badge" />
    </motion.div>
  ),
  facebook: (
    <motion.div animate={{ scale: 1.25 }} transition={{ duration: 1 }}>
      <FaFacebookSquare className="dashboard-badge" />
    </motion.div>
  ),
  twitter: (
    <motion.div animate={{ scale: 1.25 }} transition={{ duration: 1 }}>
      <FaTwitter className="dashboard-badge" />
    </motion.div>
  ),
  tiktok: (
    <motion.div animate={{ scale: 1.25 }} transition={{ duration: 1 }}>
      <SiTiktok className="dashboard-badge" />
    </motion.div>
  ),
  youtube: (
    <motion.div animate={{ scale: 1.25 }} transition={{ duration: 1 }}>
      <IoLogoYoutube className="dashboard-badge" />
    </motion.div>
  ),
};
