import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FcHighPriority, FcFolder } from 'react-icons/fc';


const generateDots = () => {
  const dots = [];
  for (let i = 0; i < 6; i++) {
    dots.push({
      id: i,
      width: Math.floor(Math.random() * 80) + 20,
      height: Math.floor(Math.random() * 80) + 20,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 5,
    });
  }
  return dots;
};

const DOTS = typeof window !== 'undefined' ? generateDots() : [];

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center p-4 relative">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md z-10"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6"
        >
          <FcHighPriority size={80} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-600 mb-8"
        >
          Oops! Page not found.<br />
          Looks like you wandered into the void.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          className="inline-block mb-6"
        >
          <FcFolder size={50} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-shadow"
          >
            ← Go Back Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Dots – Now Safe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {DOTS.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${dot.width}px`,
              height: `${dot.height}px`,
              top: `${dot.top}%`,
              left: `${dot.left}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}