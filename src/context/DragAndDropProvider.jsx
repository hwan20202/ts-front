import { createContext, useContext, useState, useRef } from "react";

const DragAndDropContext = createContext();

const useDragAndDropContext = () => {
  return useContext(DragAndDropContext);
};

const DragAndDropProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const overlay = useRef();
  overlay.current = document.createElement("div");
  overlay.current.className =
    "overlay absolute top-0 left-0 right-0 bottom-0 bg-gray-500 flex items-center justify-center pointer-events-none";
  overlay.current.innerHTML =
    '<span style="font-size: 2rem; color: gray;">+</span>';
  const proxySetData = (newData) => {
    setData(newData);
  };

  return (
    <DragAndDropContext.Provider value={{ data, proxySetData, overlay }}>
      {children}
    </DragAndDropContext.Provider>
  );
};

export { useDragAndDropContext, DragAndDropProvider };
