import { useEffect, useRef, useState } from "react";

export const Accordion = () => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (expanded && nodeRef.current) {
      nodeRef.current.style.height = `${nodeRef.current.scrollHeight}px`;
    } else if (!expanded && nodeRef.current) {
      nodeRef.current.style.height = "0px";
    }
  }, [expanded]);

  return (
    <div className="w-96">
      <div className="flex items-center justify-between">
        <h3>Accordion</h3>
        <button
          className="border-none hover:border-none focus:outline-none focus-visible:outline-none bg-transparent transition-transform duration-300"
          style={{ ...{ transform: expanded ? "rotateZ(90deg)" : "rotateZ(-90deg)" } }}
          onClick={handleClick}
        >
          {"->"}
        </button>
      </div>

      <div ref={nodeRef} className="transition-[height] duration-300 overflow-hidden">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget.
        </p>
        <div className="h-8 bg-blue-600 text-white">ddd</div>
      </div>
    </div>
  );
};
