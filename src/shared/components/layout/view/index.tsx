import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type AnimationViewProps = {
  children: JSX.Element,
}

const AnimationView: React.FC<AnimationViewProps> = ({children}) => {
  const [height, setHeight] = useState('100%');
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(onChangeResize);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    }
  }, []);

  const onChangeResize = (entries) => {
    if (!containerRef.current) {
      return;
    }
    setHeight(entries[0].contentRect.height);
  };

  return (
    <motion.div
      animate={{height}}
      transition={{duration: 0.5}}
      style={{width: '100%', overflow: 'hidden', height}}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
};

export default AnimationView;