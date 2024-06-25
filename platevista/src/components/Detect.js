import React from 'react'
import Tesseract from "tesseract.js";
import "./Detect.css";
import axios from 'axios';
import { useState } from 'react';
import Header from"./Header";


function Detect() {
    const [licensePlate, setLicensePlate] = useState("");
    const [imageData, setImageData] = useState(null);
  
    const extractLicensePlate = async () => {
      if (!imageData) return;
  
      try {
        const result = await Tesseract.recognize(imageData, 'eng', {
          logger: (m) => {
            console.log(m);
          },
        });
  
        // Extract any sequence of letters and numbers from the OCR result
        const extractedLicensePlate = result.data.text.match(/[A-Za-z0-9]+/g);
  
        if (extractedLicensePlate) {
          setLicensePlate(extractedLicensePlate.join(''));
        } else {
          setLicensePlate("No license plate found");
        }
      } catch (error) {
        console.error("Error during OCR:", error);
      }
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUri = reader.result;
        console.log({ imageDataUri });
        setImageData(imageDataUri);
      };
      reader.readAsDataURL(file);
    };
  
    const handleExtractClick = () => {
      extractLicensePlate();
    };
  return (
    <div>
      <Header />
    <div className="detect-container">
    
       <div>
        <p className="heading">Choose an Image</p></div>
        <div>
        <input 
          type="file"
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className="display-flex">
        <img src={imageData} alt="" />
        <p>{licensePlate}</p>
      </div>
      <button className='extract-button' onClick={handleExtractClick}>Extract License Plate</button><br/>
    </div>
    </div>
  )
}

export default Detect
