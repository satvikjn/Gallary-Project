import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageUploader from './components/ImageUploader';
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
      </Routes>
    </Router>
  );
};

export default App;
