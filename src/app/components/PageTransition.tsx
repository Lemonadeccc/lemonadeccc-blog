'use client'

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {children}

        <motion.div
          className="slide-in"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="slide-out"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
