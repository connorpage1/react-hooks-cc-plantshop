import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, searchQuery }) {

  const filteredList = plants.filter(plant => {
    // if there is a search query, filter the list
    if (searchQuery) {
      return plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
    // else, include all plants
    else {
      return plant
    }
  } )

  return (
    <ul className="cards">{filteredList.map((plant)=> <PlantCard key={plant.id} {...plant}/>)}</ul>
  );
}

export default PlantList;
