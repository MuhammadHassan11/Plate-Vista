import React from 'react'
import './Home.css';
import Header from './Header';
function Home() {
  return (
    
    <div>
        <Header />



        
      <div className="home-container">
        
      <h1>Welcome to Plate Vista(Automatic License Plate Recognition system)</h1>
      <p ><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXeJdH3nxOZ_kQVbzM2HHITRcHu4xLbhf2A&usqp=CAU'/></p>
      
      <p>
        Automatic License Plate Recognition (ALPR) is a system that uses computer vision and
        image processing techniques to identify and recognize license plates in images
        or video streams. It has various applications, including vehicle tracking,
        law enforcement, and parking management.
      </p>
      <p>
        Our platform allows you to upload an image, and using the Tesseract.js library,
        it extracts the license plate information from the image. Try it out in the
        "Detect" section to experience the Automatic License Plate Recognition process.
      </p>
      <p>
        Get started by navigating to the "Detect" section and follow the instructions
        to choose an image and extract license plate information.
      </p>
    </div>
    </div>
  )
}

export default Home

