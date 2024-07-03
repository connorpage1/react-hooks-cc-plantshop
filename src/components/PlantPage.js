import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const url = "http://localhost:6001/plants"

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // GET request for data
  useEffect(()=> {
    fetch(url)
    .then(res => res.json())
    .then(setPlants)
    .catch(console.log)
  }, [])

  return (
    <main>
      <NewPlantForm url={url} addPlant={addPlant}/>
      <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      <PlantList plants={plants} searchQuery={searchQuery}/>
    </main>
  );
}

export default PlantPage;
