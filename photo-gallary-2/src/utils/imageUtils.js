export const getCroppedImg = async (imageSrc, crop, rotation = 0, flip = { horizontal: false, vertical: false }) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const safeArea = Math.max(image.width, image.height) * 2;

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);

  const data = ctx.getImageData(
    crop.x + safeArea / 2 - image.width / 2,
    crop.y + safeArea / 2 - image.height / 2,
    crop.width,
    crop.height
  );

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL('image/jpeg');
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = url;
  });
