export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };
  
  export const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  export const slideIn = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 }
  };