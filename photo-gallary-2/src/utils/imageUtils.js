// Example: Helper function to rotate image
export const rotateImage = (image, angle) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.translate(image.width / 2, image.height / 2);
    context.rotate((angle * Math.PI) / 180);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    return canvas.toDataURL();
  };
  
  // Example: Helper function to flip image horizontally or vertically
  export const flipImage = (image, horizontal = false, vertical = false) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.translate(image.width / 2, image.height / 2);
    context.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    return canvas.toDataURL();
  };
  