import React, { createContext, useContext } from "react";
import { motion } from "framer-motion";

const TabsContext = createContext();

export const Tabs = ({ children, value, onValueChange, className = "" }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = "" }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const TabsTrigger = ({ children, value, className = "" }) => {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <motion.button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-gray-800 text-white border-b-2 border-gray-600"
          : "text-gray-400 hover:text-gray-300"
      } ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export const TabsContent = ({ children, value, className = "" }) => {
  const { value: activeValue } = useContext(TabsContext);

  if (activeValue !== value) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
