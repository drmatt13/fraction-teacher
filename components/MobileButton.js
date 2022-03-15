import { useRef } from "react";

const MobileButton = ({ children, className, onClick }) => {
  const divRef = useRef();

  const onMouseEnter = () => {
    divRef.current.focus();
  };

  const onMouseLeave = () => {
    divRef.current.blur();
  };

  const onMouseDown = () => {
    onClick();
    divRef.current.focus();
  };

  const onMouseUp = (e) => {
    e.preventDefault();
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    divRef.current.blur();
  };

  return (
    <button
      className={`focus:outline-none ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onTouchEnd}
      ref={divRef}
    >
      {children}
    </button>
  );
};

export default MobileButton;
