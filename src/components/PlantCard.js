import React, { useState } from "react";

function PlantCard({ name, id, image, price, fetchDeletePlant, handleDelete, url, handleError }) {
  const [inStock, setInStock] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState(price)
  
  const fetchPatchPlant = (plantId) => {
    const data = {price: parseFloat(editValue)}
    


    fetch(`${url}/${plantId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(updatedPlant => {
      // Handle successful response
      setEditValue(updatedPlant.price);
      setEditMode(false);
    })
    .catch(err => handleError(err.message || err) )
  }


  const handleClick = () => {
    setInStock(current => !current)
  }
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {editMode ? (
        <input type='number' 
        name='price' 
        value={editValue} 
        step="0.01" 
        onChange={(e) => setEditValue(e.target.value)}
        /> ): (
          editValue)}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      {editMode? (
        <button onClick={() => {
          fetchPatchPlant(id)
        }}>Update</button>
        ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
        )}
      <button onClick={() => fetchDeletePlant(id, handleDelete)}>🗑</button>
    </li>
  );
}

export default PlantCard;
