

export const rotateImage = (imageSrc, angle, callback) => {
    const image = new Image();
    image.src = imageSrc;
  
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // Adjust canvas dimensions for rotation
      if (angle % 180 === 0) {
        canvas.width = image.width;
        canvas.height = image.height;
      } else {
        canvas.width = image.height;
        canvas.height = image.width;
      }
  
      // Perform rotation
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((angle * Math.PI) / 180);
      context.drawImage(image, -image.width / 2, -image.height / 2);
  
      // Return the transformed image
      callback(canvas.toDataURL());
    };
  
    image.onerror = () => {
      console.error("Failed to load image for rotation.");
    };
  };
  
  export const flipImage = (imageSrc, flipDirection, callback) => {
    const image = new Image();
    image.src = imageSrc;
  
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // Set canvas dimensions
      canvas.width = image.width;
      canvas.height = image.height;
  
      // Perform flip based on direction
      if (flipDirection === 'horizontal') {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      } else if (flipDirection === 'vertical') {
        context.translate(0, canvas.height);
        context.scale(1, -1);
      } else {
        console.error("Invalid flip direction. Use 'horizontal' or 'vertical'.");
        return;
      }
  
      context.drawImage(image, 0, 0);
  
      // Return the transformed image
      callback(canvas.toDataURL());
    };
  
    image.onerror = () => {
      console.error("Failed to load image for flipping.");
    };
  };

  export const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
  
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/jpeg');
    });
  };
  
  export const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Prevent CORS issues
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  
  // Convert degrees to radians
  export const getRadianAngle = (degreeValue) => (degreeValue * Math.PI) / 180;