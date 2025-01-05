
# Image Uploader and Editor

## Overview

This project is a feature-rich React-based image uploader and editor. It allows users to upload, manage, and edit images with various functionalities like cropping, rotating, flipping, and organizing images. The app also includes a gallery view with advanced search and sorting options for efficient image management.

## Features

### Image Upload
- Upload images from your local system.
- Automatically previews the uploaded image.

### Image Editing
- Crop images using a user-friendly interface.
- Rotate images in 90° increments.
- Flip images horizontally and vertically.
- Replace images directly from the editor.

### Image Gallery
- View all uploaded images in a masonry-style layout.
- Search images by ID.
- Sort images by:
  - Newest First
  - Oldest First
  - Alphabetical Order (A-Z)

### Navigation
Conditionally displayed navigation bar with:
- A search bar for image filtering.
- A dropdown for sorting images.
- A button to add more images.

## Technologies Used
- **React**: Frontend framework for building the UI.
- **Material-UI (MUI)**: For pre-styled components like AppBar, Buttons, Drawer, and TextFields.
- **React-Easy-Crop**: To enable cropping functionalities.
- **Masonry Layout**: For an organized gallery view.
- **Custom Utilities**: Functions for image transformations (rotation, flipping, cropping).

## Project Structure

```
src/
├── components/
│   ├── ImageUploader.js   # Main component for the image uploader
├── utils/
│   ├── imageTransformUtils.js   # Utility functions for image manipulation
├── img/
│   ├── folder2.png   # Default folder image
└── App.js   # Main application entry point
```

## Installation and Setup

### Install Dependencies
```bash
npm install
```

### Start the Development Server
```bash
npm vite
```

### Open in Browser
Visit http://localhost:5173 to view the application.

## How to Use

### Upload Images:
- Click on the "Add" button in the main view or gallery navigation bar.
- Select an image from your system.

### Edit Images:
- Click on an image in the gallery to open the editor.
- Use the cropper to adjust the image.
- Rotate or flip the image using the respective buttons.
- Save changes by providing a unique image ID and clicking "Apply."

### Search and Sort:
- Use the search bar in the gallery navigation to filter images by ID.
- Use the sort dropdown to organize the images based on your preference.

## Screenshots
- Main View (Upload Interface)
![alt text](</photo-gallary-2/Screen Shots/Screenshot 2025-01-05 113850.png>)
- Gallery View with Sorting and Search
![alt text](</photo-gallary-2/Screen Shots/Screenshot 2025-01-05 113842.png>)
- Image Editing Interface
![alt text](</photo-gallary-2/Screen Shots/Screenshot 2025-01-05 113726.png>)

## Acknowledgments
- **React-Easy-Crop** for the cropping functionality.
- **Material-UI** for providing flexible and accessible UI components.

## Contact
For any queries or suggestions, feel free to contact:

- Name: Satvik Jain
- Email: satvikjain1192@gmail.com
- GitHub: https://github.com/satvikjn

Happy Coding! 🚀
