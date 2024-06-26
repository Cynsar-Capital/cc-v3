"use client";
import { useEffect, useState } from "react";
import { UserIcon, BoltIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export default function FrontPageAnimation() {
  const [chatSteps, setChatSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const userMessages = [
    "Based on my profile should I get Tesla stocks?",
    "How about creating an alert for me on the price point?",
    "Do you think the stock is close to the values that I ascribe to?",
  ];
  const botMessages = [
    "It looks like you should get 100 stocks this month.",
    "Sure, I have set an alert for you at the specified price point.",
    "Not sure about that recent reports say otherwise",
  ];

  useEffect(() => {
    const handleNextStep = () => {
      if (currentStep < userMessages.length) {
        setChatSteps((prev) => [
          ...prev,
          { type: "user", text: userMessages[currentStep] },
        ]);
        setTimeout(() => {
          setChatSteps((prev) => [
            ...prev,
            { type: "bot", text: botMessages[currentStep] },
          ]);
          setCurrentStep((prev) => prev + 1);
        }, 2000); // Delay before bot response
      } else {
        // Reset the chat after a delay
        setTimeout(() => {
          setChatSteps([]);
          setCurrentStep(0);
        }, 5000); // Delay before restarting the chat
      }
    };

    const stepTimer = setTimeout(
      handleNextStep,
      currentStep === 0 ? 1000 : 5000,
    ); // Initial delay for first message

    return () => {
      clearTimeout(stepTimer);
    };
  }, [currentStep]);

  const iconVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex h-full items-end justify-end">
      <div className="w-full h-full">
        {/* Chat area */}
        <div className="flex-1 flex flex-col justify-end items-end space-y-5 py-8">
          {chatSteps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={iconVariant}
              transition={{ duration: 0.5 }}
              className={`flex ${
                step.type === "bot" ? "flex-row-reverse" : ""
              } justify-end py-2`}
            >
              {step.type === "user" ? (
                <>
                  <UserIcon
                    className="inline-block h-10 w-10 rounded-full"
                    color="indigo"
                  />
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-10 text-xl tracking-tight text-gray-700 sm:text-xl"
                  >
                    {step.text}
                  </motion.div>
                </>
              ) : (
                <>
                  <BoltIcon className="inline-block h-10 w-10 rounded-full text-green-500" />
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-10 text-xl font-bold tracking-tight text-gray-800 sm:text-xl"
                  >
                    {step.text}
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
