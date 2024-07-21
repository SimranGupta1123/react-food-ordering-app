import { CDN_URL } from "../../utils/constants";

const Restrauntcard = (props) => {
  const { resData } = props;
  const { name, cuisines, cloudinaryImageId, avgRatingString } = resData?.info;
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      ></img>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(" , ")}</h4>
      <h4>{avgRatingString} Stars</h4>
      <h4>38mins</h4>
    </div>
  );
};

// HOC
// input - Restrauntcard => RestrauntcardPromoted

export const withOpenLabel = (Restrauntcard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Open
        </label>
        <Restrauntcard {...props} />
      </div>
    );
  };
};

export default Restrauntcard;
