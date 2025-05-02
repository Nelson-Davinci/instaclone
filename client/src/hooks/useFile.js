import { useState } from "react";

export function useFiles() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [err, setErr] = useState(null);

  const handleFiles = (e) => {
    const files = e.target.files;
    //checking our files in an array
    if (files) {
      const fileArray = [...Array.from(files || [])];
      //check file length
      if (fileArray.length > 10) {
        setErr("You can upload up to 10 media files");
        return;
      }
      //check for valid image or video files
      const validFiles = fileArray.filter((file) => {
        if (
          !file.type.startsWith("image/") &&
          !file.type.startsWith("video/")
        ) {
          setErr("Please upload only image or video files");
          return false;
        }
        //check each file size
        if (file.size > 10 * 1024 * 1024) {
          setErr("File size should not exceed 10MB");
          return false;
        }
        return true;
      });
      // clear previous files before adding new ones
      setSelectedFiles([]);
      setErr(null);
      //convert selectedFiles to base64 url strings
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFiles((prev) => [
            ...prev,
            { file, preview: reader.result },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  return { selectedFiles, setSelectedFiles, err, setErr, handleFiles };
}
