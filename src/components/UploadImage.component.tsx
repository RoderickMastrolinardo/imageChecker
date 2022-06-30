import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ThreeDots } from "react-loader-spinner";
import "./UploadImage.css";

interface UploadImageProps {
  onUpload: Function;
  selectedImage: any;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onUpload,
  selectedImage,
}) => {
  const [loading, setLoading] = useState(false);
  const uploadImage = (file: any) => {
    setLoading(true);
    onUpload(file);
  };
  const onDrop = (acceptedFiles: any, event: any) => {
    uploadImage(acceptedFiles[0]);
  };
  useEffect(() => {
    if (selectedImage || selectedImage == "error") {
      setLoading(false);
    }
  }, [selectedImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="UploadContainer">
      {loading ? (
        <ThreeDots radius={25} visible={true} color="#4caf50" />
      ) : (
        <>
          {selectedImage && selectedImage !== "error" ? (
            <div>
              <img alt="not found" src={selectedImage} />
              <button onClick={() => onUpload(null)}>Remover</button>
            </div>
          ) : (
            <div className={"dropzone-div"} {...getRootProps()}>
              <input {...getInputProps()} accept=".jpg,.jpeg,.png" />
              {isDragActive ? (
                <p>arrastra la imagen aquí</p>
              ) : (
                <p>Arrastra y suelta la imagen en el cuadro o presiona aquí</p>
              )}
            </div>
          )}
          <br />
          <input
            type="file"
            name="myImage"
            accept=".jpg,.jpeg,.png"
            onChange={async (event) => {
              const { files } = event.target;
              if (files && files.length > 0) {
                uploadImage(files[0]);
              }
            }}
          />
        </>
      )}
    </div>
  );
};
export default UploadImage;
