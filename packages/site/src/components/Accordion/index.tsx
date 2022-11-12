import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export const Accordion = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [inProp, setInProp] = useState(false);

  const handleClick = () => {
    setInProp((prev) => !prev);
  };

  useEffect(() => {
    if (inProp && nodeRef.current) {
      nodeRef.current.style.height = `${nodeRef.current.scrollHeight}px`;
    }
  }, [inProp]);

  return (
    <div className="w-96">
      <div className="flex items-center justify-between">
        <h3>Accordion</h3>
        <button
          className={`border-none hover:border-none focus:outline-none focus-visible:outline-none bg-transparent transition-transform duration-300 ${
            inProp ? "-rotate-90" : "rotate-90"
          }`}
          onClick={handleClick}
        >
          {"->"}
        </button>
      </div>

      <CSSTransition nodeRef={nodeRef} in={inProp} timeout={700} unmountOnExit classNames="accordion">
        <div ref={nodeRef} className="h-max">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </p>
        </div>
      </CSSTransition>
    </div>
  );
};
