import React from "react";
import PlantCard from "./PlantCard";


function PlantList({ plants, searchQuery, handleDelete, handleError, url }) {

  const fetchDeletePlant = (plantId, deleteFn) => {
    fetch(`${url}/${plantId}`, {
      method: "DELETE"
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
    })
    .then(() => deleteFn(plantId))
    .catch(err => handleError(err.message || err) )
  }

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
    <ul className="cards">{filteredList.map((plant)=> <PlantCard key={plant.id} {...plant} handleDelete={handleDelete} fetchDeletePlant={fetchDeletePlant}/>)}</ul>
  );
}

export default PlantList;
