import React, { useState } from 'react';
import { Drawer, Button, IconButton, Typography, Box, Grid, TextField, AppBar, Toolbar } from '@mui/material';
import folder from "./img/folder2.png";
import { Upload as UploadIcon, RotateRight, Flip } from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import Masonry from '@mui/lab/Masonry';
import { rotateImage, flipImage, getCroppedImg } from '../utils/imageTransformUtils';


const ImageUploader = ({ imageList, setImageList, setDrawerVisible, setSelectedImage, drawerVisible, selectedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [imageId, setImageId] = useState(''); // State to store the image ID
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryVisible, setGalleryVisible] = useState(false); // New state to control navbar visibility

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setDrawerVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleRotate = () => {
    if (!selectedImage) return;

  rotateImage(selectedImage, 90, (rotatedImage) => {
    setSelectedImage(rotatedImage);
  });
    console.log('Rotate functionality here');
  };
  
  const handleFlipHorizontal = () => {
    if (!selectedImage) return;

    flipImage(selectedImage, 'horizontal', (flippedImage) => {
      setSelectedImage(flippedImage); // Update the image state with the flipped image
    });
  };
  
  const handleFlipVertical = () => {
    if (!selectedImage) return;

  flipImage(selectedImage, 'vertical', (flippedImage) => {
    setSelectedImage(flippedImage); // Update the image state with the flipped image
  });
  };
  

  const handleReplaceImage = () => {
    document.getElementById('imageUploader').click();
  };

  const applyChanges = async () => {
    if (!imageId.trim()) {
      alert('Please provide a unique ID for the image.');
      return;
    }
  
    try {
      const croppedImage = await getCroppedImg(selectedImage, croppedArea);
      const newImage = { id: imageId.trim(), src: croppedImage };
      setImageList([...imageList, newImage]);
      setSelectedImage(null);
      setDrawerVisible(false);
      setImageId('');
      setGalleryVisible(true);
    } catch (error) {
      console.error('Error while applying changes:', error);
      alert('Failed to apply changes. Please try again.');
    }
  };

  const filteredImages = searchQuery
    ? imageList.filter((image) => image?.id?.toLowerCase().includes(searchQuery.toLowerCase()))
    : imageList;

  return (
    <Box>
      {/* Conditionally Render Navigation Bar */}
      {galleryVisible && (
        <AppBar position="fixed" sx={{ bgcolor: '#fff', zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search by Image ID..."
              variant="outlined"
              sx={{ flex: 7 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Add More Photos Button */}
            <Button
              variant="contained"
              component="label"
              sx={{ flex: 1 }}
            >
              + Add Photos
              <input
                id="imageUploader"
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Toolbar>
        </AppBar>
      )}

      {/* Content Section */}
      <Box sx={{ pt: galleryVisible ? 10 : 0, px: 3 }}>
        {!galleryVisible && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            minHeight: '50vh',
          }}>
            <Box component="img"
              src={folder}
              alt="My Image"
              sx={{
                width: '15%',
                boxShadow: 'none',
              }} />
            <Typography variant="caption" gutterBottom sx={{ display: 'block', mt: 2 }}>
              Add Assets Here
            </Typography>
            {!drawerVisible && (
              <Button variant="contained" component="label" sx={{ marginY: '10px' }}>
                + Add
                <input
                  id="imageUploader"
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            )}
          </Box>
        )}

        <Drawer
          anchor="right"
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        >
          <Box sx={{ width: 1000, p: 2 }}>
            <Typography variant="h6">Edit Image</Typography>
            {selectedImage && (
              <Box>
                {/* Image Cropper */}
                <Box sx={{ position: 'relative', height: 300, bgcolor: '#f0f0f0', mt: 2 }}>
                  <Cropper
                    image={selectedImage}
                    cropShape="rect"
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                  />
                </Box>
                {/* Image ID Input */}
                <TextField
                  label="Image ID"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={imageId}
                  onChange={(e) => setImageId(e.target.value)}
                />
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <IconButton onClick={handleRotate} color="primary">
                    <RotateRight />
                  </IconButton>
                  <IconButton onClick={handleFlipHorizontal} color="primary">
                    <Flip />
                  </IconButton>
                  <IconButton onClick={handleFlipVertical} color="primary">
                    <Flip sx={{ transform: 'rotate(90deg)' }} />
                  </IconButton>
                  <Button variant="outlined" onClick={handleReplaceImage}>
                    Replace Image
                  </Button>
                  <Button variant="contained" onClick={applyChanges}>
                    Apply
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Drawer>

        
        {galleryVisible && (
          // <Grid container spacing={2}>
          <Masonry columns={4} spacing={2}>
            {filteredImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ position: 'relative' }}>
                  <img src={image.src} alt={image.id} style={{ width: '100%' }} />
                  <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                    {image.id}
                  </Typography>
                </Box>
              </Grid>
            ))}
            </Masonry>
          // </Grid>
          
        )}
      </Box>
    </Box>
  );
};

export default ImageUploader;
