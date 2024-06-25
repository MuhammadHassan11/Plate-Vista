const express = require('express');
const app = express();
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const Tesseract = require('tesseract.js');
const mysql = require('mysql2/promise'); // Import mysql2 with promise support

app.use(express.json());
app.use(cors({
  origin: '*',
}));

// MySQL database configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Hassan@786',
  database: 'capturedimages',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to process the image and store data in MySQL
const processAndStoreImage = async (imageBuffer) => {
  let originalImagePath, resizedImagePath, grayscaleImagePath, enhancedImagePath;

  try {
    // Generate a unique filename for the original captured image
    originalImagePath = `original-captured-image-${uuidv4()}.jpg`;
    await fs.writeFile(originalImagePath, imageBuffer);

    // Resize the image to a smaller size for faster processing (adjust as needed)
    resizedImagePath = `resized-image-${uuidv4()}.jpg`;
    await sharp(originalImagePath).resize(800).toFile(resizedImagePath);

    // Convert to grayscale
    grayscaleImagePath = `grayscale-image-${uuidv4()}.jpg`;
    await sharp(resizedImagePath).grayscale().toFile(grayscaleImagePath);

    // Enhance the image (add more enhancements based on your needs)
    enhancedImagePath = `enhanced-image-${uuidv4()}.jpg`;
    await sharp(grayscaleImagePath)
      .modulate({ brightness: 1.2, saturation: 1.5 })
      .toFile(enhancedImagePath);

    // Apply Tesseract for character recognition
    const recognizedText = await Tesseract.recognize(enhancedImagePath, 'eng', { logger: info => console.log(info) });

    // Store data in MySQL
    const sql = 'INSERT INTO captured_images (original_image_path, processed_image_path, recognized_text) VALUES (?, ?, ?)';
    const values = [originalImagePath, enhancedImagePath, recognizedText.data.text.trim()];

    const [rows] = await pool.query(sql, values);

    return {
      originalImagePath,
      processedImagePath: enhancedImagePath,
      recognizedText: recognizedText.data.text.trim(),
      message: 'Connected and data stored!',
    };
  } catch (error) {
    console.error('Error processing image:', error.message);
    console.error(error.stack);

    // If an error occurs, attempt to delete the created files before rethrowing the error
    try {
      if (originalImagePath) {
        await fs.unlink(originalImagePath);
      }
      if (resizedImagePath) {
        await fs.unlink(resizedImagePath);
      }
      if (grayscaleImagePath) {
        await fs.unlink(grayscaleImagePath);
      }
      if (enhancedImagePath) {
        await fs.unlink(enhancedImagePath);
      }
    } catch (deleteError) {
      console.error('Error deleting files:', deleteError.message);
    }

    throw error;
  }
};

// Endpoint to handle image processing and data storage
app.post('/process-and-store-image', async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data is missing' });
    }

    const imageBuffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const { originalImagePath, processedImagePath, recognizedText, message } = await processAndStoreImage(imageBuffer);

    res.json({
      originalImagePath,
      processedImagePath,
      recognizedText,
      message,
    });
  } catch (error) {
    console.error('Error processing and storing image:', error.message);
    res.status(500).json({ error: 'Error processing and storing image' });
  }
});

// Log a message when the server is successfully running
app.listen(3000, () => {
  console.log('Server is running on port 3000. Connected!');
});
