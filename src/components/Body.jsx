import { useContext, useEffect, useState } from "react";
import { resList } from "../../utils/mockData";
import Restrauntcard, { withOpenLabel } from "./Restrauntcard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import UserContext from "../../utils/userContext";

//State varaible

const Body = () => {
  const [listOfRestraunts, setListOfRestraunts] = useState([]);

  const [filteredRestraunt, setFilteredRestraunt] = useState([]);
  const { setUserName, loggedInUser } = useContext(UserContext);

  // whenever state varibales update, react triggers a recoincilation cycle that is re-renders component again.
  const [searchText, setSearchText] = useState("");

  const RestrauntCardOpen = withOpenLabel(Restrauntcard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const response = await data.json();
    // console.log(
    //   response.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    // );
    setListOfRestraunts(
      response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestraunt(
      response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  const filterTopRated = () => {
    const filterList = listOfRestraunts.filter((res) => res.info.avgRating > 4);
    setListOfRestraunts(filterList);
    setFilteredRestraunt(filterList);
  };

  const handleSearch = () => {
    const filteredList = listOfRestraunts.filter((restraunt) =>
      restraunt.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestraunt(filteredList);
  };

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Looks like you are offline!! Check your internet connection</h1>;
  return listOfRestraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex items-center">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={handleInput}
          ></input>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={filterTopRated}
          >
            Top Rated Restraunt
          </button>
        </div>
        <div className="search m-4 p-4 items-center">
          <label>UserName : </label>
          <input
            type="text"
            className="p-2 border border-black"
            onChange={(e) => setUserName(e.target.value)}
            value={loggedInUser}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestraunt.map((res) => (
          <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
            {/** If the restraunt is open we will return the HOC */}
            {res.info.isOpen ? (
              <RestrauntCardOpen resData={res} />
            ) : (
              <Restrauntcard resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

// React uses Reconciliation Algorithm(React Fiber):
/**
 * Creates a virtual DOM- Representation of actual DOM.(JS Object/ React Element)
 * Nested Object
 * Diff Algorithm - Finds out difference between updated virtual DOM and previous virtual DOM and will update the actual DOM.
 */

// Increemental Rendering
// Efficeient DOM Manipulation
