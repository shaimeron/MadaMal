import {FC, useState} from 'react';
import {api} from "../../api";

export const UploadImageButton: FC = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const image = new FormData();
        image.append('image', selectedFile);

        try {
            await api.image.uploadImage(image);
        } catch (error) {
            alert('Upload failed');
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload Image</button>
        </form>
    );
}