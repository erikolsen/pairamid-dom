import React from "react";

const useToggle = (initialState = false) => {
  const [open, setOpen] = React.useState(initialState);
  const toggle = () => setOpen(!open);
  return [open, toggle];
};

export default useToggle;
