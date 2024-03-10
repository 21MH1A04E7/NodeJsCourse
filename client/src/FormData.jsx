import React, { useState } from 'react';
import axios from 'axios'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollno:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8777/api/data',formData)
    .then((res)=>console.log(res ))
    .catch((err) => console.log(err))
  };
  

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Age:
          <input
            type="number"
            name="rollno"
            value={formData.rollno}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
