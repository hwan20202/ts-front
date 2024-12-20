import React, { useState, useRef, useEffect } from "react";

const WheelSelector = ({ children, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(children.length / 2 + 3);
  const scrollRef = useRef(null);
  const [wheelTimeout, setWheelTimeout] = useState(null);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const firstChild =
        scrollRef.current.children[scrollRef.current.children.length / 2];
      setItemHeight(firstChild.offsetHeight);
    }
  }, [children]);

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % options.length);
  };

  const handlePrevious = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + options.length) % options.length
    );
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(options[selectedIndex]);
    }
  };

  const findClosestElement = () => {
    if (scrollRef.current) {
      const containerRect = scrollRef.current.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(scrollRef.current.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenterY = childRect.top + childRect.height / 2;
        const distance = Math.abs(childCenterY - centerY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setSelectedIndex(closestIndex); // 가장 가까운 요소의 인덱스를 설정
    }
  };

  const handleScroll = () => {
    if (wheelTimeout) clearTimeout(wheelTimeout);
    setWheelTimeout(
      setTimeout(() => {
        findClosestElement();
      }, 100)
    );
  };

  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.children[selectedIndex];
      if (selectedElement) {
        const container = scrollRef.current;
        const containerHeight = container.clientHeight;
        const selectedElementHeight = selectedElement.clientHeight;
        const selectedElementOffset = selectedElement.offsetTop;

        // 중앙으로 스크롤하기 위한 위치 계산
        const scrollToPosition =
          selectedElementOffset -
          containerHeight / 2 +
          selectedElementHeight / 2;

        container.scrollTo({
          top: scrollToPosition,
          behavior: "smooth", // 부드러운 스크롤
        });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleResize = () => {
      findClosestElement(); // 창 크기 조정 시 가장 가까운 요소 찾기
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col w-full justify-center items-center border border-gray-200"
      // style={{ height: `${itemHeight * 3}px` }}
    >
      {/* <div
        className="absolute top-1/2 transform -translate-y-1/2 border border-gray-200 w-full pointer-events-none"
        style={{ height: `${itemHeight}px` }}
      ></div>
      <div
        className="overflow-y-auto h-full w-full"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <div style={{ height: `${itemHeight}px` }} />

        {children}

        <div style={{ height: `${itemHeight}px` }} />
      </div> */}

      <div className="relative flex justify-center h-20 items-center w-full">
        <div className="absolute top-1/2 transform -translate-y-1/2 border border-gray-200 w-full h-10 ">
          {children}
        </div>
      </div>
      <button onClick={handleSelect} className="select-button">
        선택하기
      </button>
    </div>
  );
};

export default WheelSelector;
