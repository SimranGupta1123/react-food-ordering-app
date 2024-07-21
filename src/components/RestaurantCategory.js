import { useState } from "react";
import ItemList from "./ItemList";

const RestuarantCategory = ({ data, showIndex, setShowIndex, index }) => {
  // const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowIndex(index);
  };
  return (
    <div>
      {/** Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length}){" "}
          </span>
          <span>⬇️</span>
        </div>

        {showIndex && <ItemList items={data.itemCards} />}
      </div>
      {/** Accordion */}
    </div>
  );
};

export default RestuarantCategory;
