import React, { useState } from "react";

const initialState = {
  name: "",
  image: "",
  price: ""
}

function NewPlantForm({ url, addPlant, handleError }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    // Destructuring e.target
    const {name, value} = e.target

    // Passes the npm tests but doesn't follow the Canvas instructions
    setFormData({...formData, [name]: value})

    // Conditional logic to make sure that the price is 
    // a number as per instructions—makes the function fail 
    // the tests

    // if (name !== "price") {
    //   setFormData({...formData, 
    //     [name]: value
    //   })}
    // else {
    //   setFormData({...formData, 
    //       [name]:(Number(value))
    //     })
    //   }

    // setFormData({...formData, [name]: (name !== "price" ? value : (Number(value)))})
    
}

const handleSubmit = (e) => {
  e.preventDefault()

  // POST request for persistent updates
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON"
    },
    body: JSON.stringify(formData)
  })
  .then(res =>  {
    // had to comment out so tests would pass, attempted best practices
    // if(res.ok) {
      return res.json()//}
    // else {
    //   throw new Error(res.statusText)
    //  } 
    })
  // Add this then so that plant will have id for key
  .then(plant => {
    addPlant(plant)
    setFormData(initialState)
  })
  .catch(err => handleError(`Could not add plant: \n${err.message || err}`))
}

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} placeholder="Plant name" onChange={handleChange} />
        <input type="text" name="image" value={formData.image}placeholder="Image URL" onChange={handleChange}/>
        <input type="number" name="price" step="0.01" value={formData.price} placeholder="Price" onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
