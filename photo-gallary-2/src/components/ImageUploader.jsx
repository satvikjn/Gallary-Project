import React, { useState } from 'react';
import { Drawer, Button, IconButton, Typography, Box, Grid } from '@mui/material';
import folder from "./img/folder2.png"
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, RotateRight, Flip } from '@mui/icons-material';
import Cropper from 'react-easy-crop';


const ImageUploader = ({ imageList, setImageList, setDrawerVisible, setSelectedImage, drawerVisible, selectedImage }) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const navigate = useNavigate();

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

  const handleReplaceImage = () => {
    document.getElementById('imageUploader').click();
  };

  const applyChanges = () => {
    setImageList([...imageList, selectedImage]);
    setSelectedImage(null);
    setDrawerVisible(false);
  };

  const handleRotate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      canvas.width = img.height;
      canvas.height = img.width;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setSelectedImage(canvas.toDataURL());
    };
  };

  const handleFlip = (direction) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.translate(direction === 'horizontal' ? canvas.width : 0, direction === 'vertical' ? canvas.height : 0);
      ctx.scale(direction === 'horizontal' ? -1 : 1, direction === 'vertical' ? -1 : 1);
      ctx.drawImage(img, 0, 0);
      setSelectedImage(canvas.toDataURL());
    };
  };


  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <svg>DriveFolderUploadIcon</svg>
        <Box component="img"
          src={folder}
          alt="My Image"
          sx={{
            width: '15%',
            boxShadow: 'none',
          }} />
        {/* <img src={folder} alt="Me" width={300} height={300}  /> */}
        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
          Add Assets Here
        </Typography>
        <Button variant="contained" component="label" sx={{ marginY: '10px' }}>
          +  Add
          <input
            id='imageUploader'
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>


      </Box>

      <Drawer
        anchor="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <Box sx={{ width: 1000, p: 2 }}>
          <Typography variant="h6">Edit Image</Typography>
          {selectedImage && (
            <Box>
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
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <IconButton onClick={handleRotate} color="primary">
                  <RotateRight />
                </IconButton>
                <IconButton onClick={() => handleFlip('horizontal')} color="primary">
                  <Flip />
                </IconButton>
                <IconButton onClick={() => handleFlip('vertical')} color="primary">
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


    </Box>
  );
};

export default ImageUploader;
