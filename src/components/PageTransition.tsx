"use client";

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -25 },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);
  // Whether this render came from the browser's own back/forward, and whether it is the
  // very first one. Both are cases where the browser has already decided where the page
  // should sit, and overruling it is worse than doing nothing.
  const isPop = useRef(false);
  const isFirst = useRef(true);

  useEffect(() => {
    const onPop = () => {
      isPop.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    setPath(pathname);

    // Next scrolls a new route to the top by asking whether the top of the new page is
    // already visible. That question gets the wrong answer here: the outgoing page is
    // still occupying document height when it is asked, so arriving from halfway down a
    // long page left the next one opening halfway down too.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (isPop.current) {
      isPop.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={path}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.8, type: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
