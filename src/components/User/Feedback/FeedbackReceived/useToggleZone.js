import React, { useState } from "react";

const useToggleZone = (name, initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);
  const toggleOpen = () => setOpen(!open);
  const toggleZone = open ? "block" : "hidden";
  const toggleButtonClasses = open
    ? "bg-blue-700 text-white"
    : "hover:border-2 hover:border-blue-700";
  const ToggleButton = ({ className }) => {
    return (
      <button
        onClick={toggleOpen}
        className={`ml-2 flex items-center border border-gray-border rounded-lg px-4 py-2 focus:outline-none ${toggleButtonClasses} ${className}`}
      >
        <p className="text-sm">{name}</p>
      </button>
    );
  };
  const ToggleZone = ({ children, className }) => {
    return <div className={`${toggleZone} ${className}`}>{children}</div>;
  };
  return [ToggleButton, ToggleZone];
};

export default useToggleZone;
