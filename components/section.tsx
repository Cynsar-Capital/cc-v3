"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => {
    const delay = 0.5 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function Section() {
  const [positions, setPositions] = useState([]);
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculatePositions = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPositions: any = refs.map((ref) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            return {
              x: rect.right - containerRect.left,
              y: rect.top + rect.height / 2 - containerRect.top,
            };
          }
          return { x: 0, y: 0 };
        });
        setPositions(newPositions);

        const centerX = containerRect.width * 0.65; // Move center point towards left
        const centerY = containerRect.height / 2;
        setCenterPoint({ x: centerX, y: centerY });
      }
    };

    calculatePositions();
    window.addEventListener("resize", calculatePositions);

    return () => window.removeEventListener("resize", calculatePositions);
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Grow wealth like anything
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our CC-AI assistant makes its easy for you to have all the important
            correct information in aiding to grow your wealth super fast
          </p>
        </div>
      </div>
      <div className="relative mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div
          ref={containerRef}
          className="relative flex justify-between items-start"
        >
          <div className="flex flex-col gap-8 z-10">
            {["Technical", "Fundamental", "Everything else"].map(
              (text, index) => (
                <div
                  key={index}
                  ref={refs[index]}
                  className="bg-white p-6 shadow-md rounded-lg"
                >
                  <h3 className="text-lg font-semibold">{text}</h3>
                  <p className="text-sm"></p>
                </div>
              ),
            )}
          </div>
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%">
              {centerPoint.x !== 0 && (
                <>
                  <circle
                    cx={centerPoint.x}
                    cy={centerPoint.y}
                    r="50"
                    className="animate-pulse fill-current text-gray-400"
                  />
                  <motion.circle
                    cx={centerPoint.x}
                    cy={centerPoint.y}
                    r="10"
                    className="bg-gradient-to-r from-indigo-500"
                    fill="green"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                  />
                  {positions.map((pos: any, index) => (
                    <motion.path
                      key={index}
                      d={`M${pos.x},${pos.y} C${(pos.x + centerPoint.x) / 2},${pos.y} ${(pos.x + centerPoint.x) / 2},${centerPoint.y} ${centerPoint.x},${centerPoint.y}`}
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                      variants={draw}
                      custom={index + 1}
                      initial="hidden"
                      animate="visible"
                    />
                  ))}
                  <motion.path
                    d={`M${centerPoint.x},${centerPoint.y} h100`}
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    variants={draw}
                    custom={5}
                    initial="hidden"
                    animate="visible"
                  />
                </>
              )}
            </svg>
          </div>
          <div className="flex flex-col gap-8 z-10 py-24">
            <motion.div
              className="bg-white p-6 shadow-md rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 4,
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-lg font-semibold text-indigo-400">
                Wealth Creation
              </h3>
              <p className="text-sm text-indigo-400">
                On your finger in your language
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
