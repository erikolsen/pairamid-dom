import React, { useEffect, useCallback, useState, useRef } from "react";

const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setShow, setAnchorPoint]
  );

  const closeClick = useCallback(() => show && setShow(false));

  const ClickZone = ({ children, menu }) => {
    const ref = useRef();

    useEffect(() => {
      ref.current.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("click", closeClick);
      return () => {
        ref.current.removeEventListener("contextmenu", handleContextMenu);
        window.removeEventListener("click", closeClick);
      };
    }, [ref]);

    return (
      <div ref={ref}>
        {children}
        {show && (
          <div style={{ top: anchorPoint.y, left: anchorPoint.x }}>
            <div className="absolute -mt-6 ml-5 z-10">{menu}</div>
          </div>
        )}
      </div>
    );
  };
  return ClickZone;
};

export default useContextMenu;
