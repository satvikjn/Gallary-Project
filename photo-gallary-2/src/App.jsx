import React, { useState } from "react";
import { Container, Typography, Box } from '@mui/material';
import ImageManagement from './components/ImageManagement';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageUploader from './components/ImageUploader';
import GalleryPage from "./components/GalleryPage";
import './assets/styles.css';

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ImageUploader imageList={imageList} setImageList={setImageList} setSelectedImage={setSelectedImage} setDrawerVisible = {setDrawerVisible} drawerVisible = {drawerVisible} selectedImage = {selectedImage}/>}
        />
        <Route
          path="/gallery"
          element={<GalleryPage imageList={imageList} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
