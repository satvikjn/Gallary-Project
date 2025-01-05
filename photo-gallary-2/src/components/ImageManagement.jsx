import React, { useState } from 'react';
import { Box, Drawer, Button } from '@mui/material';
import Masonry from 'react-masonry-css';
import ImageUploader from './ImageUploader';
import ImageCropper from './ImageCropper';

const ImageManagement = () => {
  const [image, setImage] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageUpload = (file) => {
    setImage(URL.createObjectURL(file));
    setOpenDrawer(true);
  };

  const handleSaveImage = (croppedImage) => {
    setImages([...images, croppedImage]);
    setOpenDrawer(false);
  };

  return (
    <Box>
      <ImageUploader onImageUpload={handleImageUpload} />

      <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Uploaded ${index}`} style={{ width: '100%' }} />
        ))}
      </Masonry>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{ width: 400 }}
      >
        <ImageCropper image={image} onSave={handleSaveImage} />
      </Drawer>
    </Box>
  );
};

export default ImageManagement;
