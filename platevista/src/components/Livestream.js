import React, { useState } from 'react';
import axios from 'axios';
import './LiveStream.css';
import Header from './Header';

const LiveStream = () => {
  const [result, setResult] = useState({ originalImagePath: '', processedImagePath: '', recognizedText: '', message: '' });

  const captureImage = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      document.body.appendChild(video);
      video.srcObject = mediaStream;

      // Wait for the video to load and play
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve();
        };
        video.play();
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');

      document.body.removeChild(video);

      // Send image data to the server for processing and storing
      const response = await axios.post('http://localhost:3000/process-and-store-image', { imageData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        throw new Error('Empty response received from the server');
      }

      setResult({
        originalImagePath: response.data.originalImagePath,
        processedImagePath: response.data.processedImagePath,
        recognizedText: response.data.recognizedText,
        message: response.data.message,
      });

      // Log the connection message in the browser console
      console.log(response.data.message);
    } catch (error) {
      console.error('Error capturing and storing image:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <button onClick={captureImage}>Capture Image</button>
        <div id="result">
          <p>Original Image Path: {result.originalImagePath}</p>
          <p>Processed Image Path: {result.processedImagePath}</p>
          <p>Recognized Text: {result.recognizedText}</p>
          <p>Connection Message: {result.message}</p>
        </div>
      </div>
    </>
  );
};

export default LiveStream;
