import { useState, useEffect, ChangeEvent } from 'react';

interface ImageUploadHook {
   selectedFile: File | null;
   preview: string | undefined;
   onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useImageUpload = (): ImageUploadHook => {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [preview, setPreview] = useState<string | undefined>();

   useEffect(() => {
      if (!selectedFile) {
         setPreview(undefined);
         return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl); 

      return () => URL.revokeObjectURL(objectUrl);
   }, [selectedFile]);

   const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
         setSelectedFile(null);
         return;
      }

      setSelectedFile(e.target.files[0]); 
   };

   return { selectedFile, preview, onSelectFile };
};

export default useImageUpload;
