import { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestuarantCategory from "./RestaurantCategory";

const RestrauntMenu = () => {
  const { resId } = useParams();

  const [showIndex, setShowIndex] = useState(null);

  // create a custom hook to fetch Data
  const resInfo = useRestaurantMenu(resId);
  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;


  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );


  const handleSetShowIndex = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return ( 
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")}- {costForTwoMessage}
      </p>

      {categories.map((category, index) => (
        // Comtrolled component
        <RestuarantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          // State Lifting parent component should control if the items should be shpwn or not
          showIndex={index === showIndex && true}
          setShowIndex={handleSetShowIndex}
          index={index}
        />
      ))}
    </div>
  );
};

export default RestrauntMenu;
