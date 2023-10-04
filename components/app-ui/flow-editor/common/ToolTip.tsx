import   { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  position: 'left' | 'top' | 'bottom' | 'right';
  content: string;
};

const ToolTip = ({ children, position, content }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [dimension, setDimension] = useState<{ width: string; height: string }>({
    width: '',
    height: '',
  });

  useEffect(() => {
    if (divRef.current) {
      setDimension({
        width: `${divRef.current.getBoundingClientRect().width}px`,
        height: `${divRef.current.getBoundingClientRect().height}px`,
      });
    }
  }, []);

  useEffect(() => {
    if (toolTipRef && toolTipRef.current && divRef.current) {
      if (show) {
        // Calculate the vertical center position
        const centerY =
          (divRef.current.getBoundingClientRect().height -
            parseInt(dimension.height)) /
          2;
        toolTipRef.current.style.top = `calc(50% + ${centerY}px)`;

        // Position the tooltip based on the specified position prop
        switch (position) {
          case 'top':
            toolTipRef.current.style.left = `calc(50% - ${parseInt(
              dimension.width
            ) / 2}px)`;
            toolTipRef.current.style.transform = 'translateY(-100%)';
            break;
          case 'bottom':
            toolTipRef.current.style.left = `calc(50% - ${parseInt(
              dimension.width
            ) / 2}px)`;
            toolTipRef.current.style.transform = 'translateY(100%)';
            break;
          case 'left':
            toolTipRef.current.style.left = `calc(-100% - 10px)`;
            toolTipRef.current.style.transform = 'translateX(-50%)';
            break;
          case 'right':
            toolTipRef.current.style.left = `calc(100% + 10px)`;
            toolTipRef.current.style.transform = 'translateX(-50%)';
            break;
          default:
            break;
        }

        toolTipRef.current.style.display = 'block';
        toolTipRef.current.style.opacity = '1';
      } else {
        toolTipRef.current.style.display = 'none';
        toolTipRef.current.style.opacity = '0';
      }
    }
  }, [show, position, dimension]);

  return (
    <div className="relative">
      <div
        className={`absolute px-2 py-1 border w-fit h-fit rounded-md bg-white pointer-events-none transition-all break-normal flex items-center z-[1000] tooltip-${position}`}
        ref={toolTipRef}
      >
        {content}
      </div>
      <div
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        ref={divRef}
      >
        {children}
      </div>
    </div>
  );
};

export default ToolTip;
