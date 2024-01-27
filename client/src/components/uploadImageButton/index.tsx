import { FC, useState } from "react";
import { api } from "../../api";
import { CardMedia } from "@mui/material";
import { selectUserId } from "../../store/user";
import { useAppSelector } from "../../hooks/store";

const mediaStyle = {
  borderRadius: "90%", // Rounded image
  maxHeight: "100px",
  maxWidth: "100px",
};

interface IUploadImageButtonProps {
  onUploadSuccess: () => void;
  onUploadFailed: () => void;
}

export const UploadImageButton: FC<IUploadImageButtonProps> = ({
  onUploadSuccess,
  onUploadFailed,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileToPreview, setSelectedFileToPreview] = useState(null);
  const userId: string = useAppSelector(selectUserId);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFileToPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const image = new FormData();
    image.append("image", selectedFile);

    try {
      await api.image.uploadImage(image, userId);
      onUploadSuccess();
    } catch (error) {
      onUploadFailed();
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
      {selectedFileToPreview && (
        <CardMedia
          style={mediaStyle}
          component="img"
          alt="Preview"
          image={selectedFileToPreview}
        />
      )}
    </form>
  );
};
