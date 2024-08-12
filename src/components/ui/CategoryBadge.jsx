import React from 'react'
import CircularBadge from './circularBadge';
import FoodAndDrinksIcons from './icons/foodAndDrinksIcon';
import MiscIcon from './icons/miscIcon';
import HealthIcon from './icons/healthIcon';
import FuelIcon from './icons/fuelIcon';
import GroceriesIcon from './icons/groceriesIcon';
import ShoppingIcon from './icons/shoppingIcon';
import BillsIcon from './icons/billsIcon';
import OtherIcon from './icons/otherIcon';

const CategoryBadge = ({ categoryName, ...props }) => {

  const CategoryNameAndIconMap = {
    "FOOD_DRINKS": <FoodAndDrinksIcons dimension={"25px"} color={"#c2410c"} />,
    "MISCELLANOUS": <MiscIcon dimension={"25px"} color={"#ef4444bf"} />,
    "MISCELLANEOUS": <MiscIcon dimension={"25px"} color={"#ef4444bf"} />,
    "HEALTH": <HealthIcon dimension={"25px"} color={"#16a34a"} />,
    "FUEL": <FuelIcon dimension={"25px"} color={"#facc15"} />,
    "GROCERY": <GroceriesIcon dimension={"25px"} color={"#16a34a"} />,
    "SHOPPING": <ShoppingIcon dimension={"25px"} color={"#1e40af"} />,
    "BILLS": <BillsIcon dimension={"25px"} color={"#7c3aed"} />,
    "OTHER": <OtherIcon dimension={"25px"} color={"#374151"} />,
  }
  return (

    !!CategoryNameAndIconMap[categoryName] ?
      <div className={`w-10 h-10  mx-auto font-bold rounded-full text-center self-center bg-gray-100 flex justify-center pt-2`}>  {CategoryNameAndIconMap[categoryName]} </div>

      : <CircularBadge letter={categoryName[0]} />
  )
}

export default CategoryBadge