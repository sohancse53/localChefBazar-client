import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';

const Banner = () => {
  const badgeControls = useAnimation();
  const headingControls = useAnimation();
  const paraControls = useAnimation();
  const cta1Controls = useAnimation();
  const cta2Controls = useAnimation();
  const iconsControls = useAnimation();

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      badgeControls.start('visible');
      setTimeout(() => headingControls.start('visible'), 200);
      setTimeout(() => paraControls.start('visible'), 400);
      setTimeout(() => cta1Controls.start('visible'), 600);
      setTimeout(() => cta2Controls.start('visible'), 750);
      setTimeout(() => iconsControls.start('visible'), 900);
    }
  }, [inView, badgeControls, headingControls, paraControls, cta1Controls, cta2Controls, iconsControls]);

  const badgeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const paraVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section 
      ref={ref}
      className="mt-5 relative bg-primary/10 py-16 md:py-28 overflow-hidden rounded-2xl"
    >
    
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-secondary/5"
      />

      <motion.div
        animate={{ 
          scale: [1, 1.03, 1],
          opacity: [0.04, 0.07, 0.04]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-l from-secondary/5 to-primary/5"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge — using primary */}
          <motion.div
            initial="hidden"
            animate={badgeControls}
            variants={badgeVariants}
            className="inline-flex items-center justify-center bg-primary/10 text-primary font-medium px-5 py-2 rounded-full mb-6"
          >
            🍽️ Today's Fresh Picks
          </motion.div>

        
          <motion.h1
            initial="hidden"
            animate={headingControls}
            variants={headingVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
          >
            Delicious Meals,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Delivered Fresh
            </span>
          </motion.h1>

        
          <motion.p
            initial="hidden"
            animate={paraControls}
            variants={paraVariants}
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
          >
            Chef-prepared with quality ingredients. Hot, ready, and just a tap away.
          </motion.p>

         
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
     

            
           <Link to="/meals">
            <motion.button
              initial="hidden"
              animate={cta2Controls}
              variants={ctaVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors duration-300"
            >
              Browse Menu
            </motion.button>
           </Link>
          </div>

         
          <motion.div 
            className="flex justify-center gap-8 text-3xl md:text-4xl"
            initial="hidden"
            animate={iconsControls}
            variants={{ visible: {} }}
          >
            {['🥗', '🍲', '🍱', '🍰'].map((icon, i) => (
              <motion.span
                key={icon}
                custom={i}
                variants={iconVariants}
                whileHover={{ 
                  y: -6,
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.4 }
                }}
                className="text-primary"
              >
                {icon}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

     
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default Banner;