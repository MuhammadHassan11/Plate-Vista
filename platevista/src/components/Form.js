import React from 'react'
import './Form.css';
import axios from 'axios';
import { useState } from 'react';

   

   

function Form() {
  const[number , setNumber] = useState('');
  console.log({number})
     // Make Axios POST request
     const handlePostData  = () => {
        axios.post("http://localhost:3210",{
         number : number
        })
        .then(response => {// Handle success, e.g., show a success message
            console.log(response.data);
            alert('Form submitted successfully!');
          })
          .catch(error => {
            // Handle error, e.g., show an error message
            console.error(error);
            alert('Error submitting form. Please check the console for details.');
          });
        };
      
    const handleNumber=(e) =>{
      setNumber(e.target.value)

    }   
  return (
  <div>
    <div class="container mt-5">
    <form>
      <div class="mb-3">
        <label for="numberPlateInput" class="form-label">Number Plate Characters</label>
        <input type="text" value={number} onChange={handleNumber} class="form-control" id="numberPlateInput" placeholder="Enter characters" />
      </div>
      <button onClick={handlePostData}>Submit</button>
      
    </form>
  </div>
    </div>
  )
}

export default Form

