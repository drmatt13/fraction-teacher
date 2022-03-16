import { useRef } from "react";

const MobileButton = ({ children, className, onClick }) => {
  const divRef = useRef();

  const onKeyPress = (e) => {
    if (e.key === "Enter") onClick();
  };

  const onMouseEnter = () => {
    divRef.current.focus();
  };

  const onMouseLeave = () => {
    divRef.current.blur();
  };

  const onMouseDown = () => {
    divRef.current.focus();
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    onClick();
  };

  const onTouchStart = (e) => {
    const styles = divRef.current.classList;
    for (let style of styles) {
      if (style.startsWith("hover:")) {
        divRef.current.classList.remove(style);
      }
    }
    divRef.current.focus();
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let changedTouch = e.changedTouches[0];
    let elem = document.elementFromPoint(
      changedTouch.clientX,
      changedTouch.clientY
    );
    while (elem && elem !== divRef.current) elem = elem.parentNode;
    if (elem === divRef.current) onClick();
    divRef.current.blur();
  };

  const onTouchCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    divRef.current.blur();
  };

  return (
    <button
      className={`focus:outline-none select-none ${className}`}
      onKeyPress={onKeyPress}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchCancel={onTouchCancel}
      ref={divRef}
    >
      {children}
    </button>
  );
};

export default MobileButton;
