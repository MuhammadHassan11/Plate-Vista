import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './DataEnter.css';

function DataEntry() {
  const [number, setNumber] = useState('');

  const handlePostData = () => {
    axios.post("http://localhost:3210", { number:number })
      .then(response => {
        console.log(response.data);
        alert('Form submitted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('Error submitting form. Please check the console for details.');
      });
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <form>
          <div className="mb-3">
            <label htmlFor="numberPlateInput" className="form-label">Number Plate Characters</label>
            <input
              type="text"
              value={number}
              onChange={handleNumber}
              className="form-control"
              id="numberPlateInput"
              placeholder="Enter characters"
            />
          </div>
          <button className='btn' type="submit" onClick={handlePostData}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DataEntry;
