import React, { useState } from "react";

function PlantCard({ name, id, image, price, fetchDeletePlant, handleDelete }) {
  const [inStock, setInStock] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState(price)

  const handleClick = () => {
    setInStock(current => !current)
  }
  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {editMode ? <input type='number' name='price' placeholder={price} step="0.01" ></input> : price}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      {/* <button onClick={() => setEditMode(current => !current)}>{(editMode ? "Update" : "Edit")}</button> */}
      <button onClick={() => fetchDeletePlant(id, handleDelete)}>🗑</button>
    </li>
  );
}

export default PlantCard;
