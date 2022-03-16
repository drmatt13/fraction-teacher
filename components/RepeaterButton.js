import { useRef } from "react";

const RepeaterButton = ({ children, className, onHold }) => {
  const delayRef = useRef();
  const intervalRef = useRef();
  const divRef = useRef();

  const onKeyDown = (e) => {
    if (e.key === "Enter") onHold();
  };

  const onMouseEnter = () => {
    divRef.current.focus();
  };

  const onMouseLeave = () => {
    divRef.current.blur();
    delayRef.current = clearTimeout(delayRef.current);
    intervalRef.current = clearInterval(intervalRef.current);
  };

  const onMouseDown = () => {
    onHold();
    divRef.current.focus();
    delayRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        onHold();
      }, 50);
    }, 300);
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    delayRef.current = clearTimeout(delayRef.current);
    intervalRef.current = clearInterval(intervalRef.current);
  };

  const onTouchStart = (e) => {
    onHold();
    divRef.current.focus();
    delayRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        onHold();
      }, 50);
    }, 300);
    const styles = divRef.current.classList;
    for (let style of styles) {
      if (style.startsWith("hover:")) {
        divRef.current.classList.remove(style);
      }
    }
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    divRef.current.blur();
    delayRef.current = clearTimeout(delayRef.current);
    intervalRef.current = clearInterval(intervalRef.current);
  };

  return (
    <button
      className={`focus:outline-none select-none ${className}`}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      ref={divRef}
    >
      {children}
    </button>
  );
};

export default RepeaterButton;
