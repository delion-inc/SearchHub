import { useState, useEffect } from 'react';

function useImageToBlob(selectedFile: File | null) {
   const [blob, setBlob] = useState<Blob | null>(null);

   const convertImageToBlob = async (imageFile: File) => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(imageFile);
      await new Promise((resolve) => img.onload = resolve);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const MAX_WIDTH = 600;
      const scaleFactor = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleFactor;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
         setBlob(blob);
      }, imageFile.type);
   };

   useEffect(() => {
      if (selectedFile) {
         convertImageToBlob(selectedFile);
      }
   }, [selectedFile]);
   // console.log(blob);

   return { blob };
}

export default useImageToBlob;
