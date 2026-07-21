"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/** server-page-friendly fadeUp wrapper */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div className={className} {...fadeUp(delay)}>
      {children}
    </motion.div>
  );
}
