import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import { toast } from "react-hot-toast"

const handleError = (errorText) => {
  toast.error(errorText)
}

const url = "http://localhost:6001/plants"

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleDelete = (plantId) => {
    setPlants(current => current.filter(plant => plant.id !== plantId))
  }

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
    .catch(err => handleError(err.message))
  }, [])

  return (
    <main>
      <NewPlantForm url={url} addPlant={addPlant} handleError={handleError}/>
      <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      <PlantList plants={plants} searchQuery={searchQuery} handleDelete={handleDelete} handleError={handleError} url={url}/>
    </main>
  );
}

export default PlantPage;
