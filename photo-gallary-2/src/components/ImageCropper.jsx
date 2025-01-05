import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import { Button, Box, IconButton } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ image, onSave }) => {
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);

  const handleSave = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const { width, height } = img;
      canvas.width = width;
      canvas.height = height;
      context.translate(width / 2, height / 2);
      context.rotate((rotation * Math.PI) / 180);
      context.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      context.drawImage(img, -width / 2, -height / 2);
      const croppedImage = canvas.toDataURL();
      onSave(croppedImage);
    };
  };

  return (
    <Box sx={{ padding: 2 }}>
      <ReactCrop
        src={imgSrc}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onImageLoaded={(image) => setImgSrc(image.src)}
      />
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={() => setRotation(rotation + 90)}>
          Rotate
        </Button>
        <IconButton onClick={() => setFlipHorizontal(!flipHorizontal)}>
          Flip Horizontal
        </IconButton>
        <IconButton onClick={() => setFlipVertical(!flipVertical)}>
          Flip Vertical
        </IconButton>
        <Button variant="contained" onClick={handleSave}>
          Save Image
        </Button>
      </Box>
    </Box>
  );
};

export default ImageCropper;
