import React from "react";
import { useDropzone } from "react-dropzone";
import "./UploadImage.css";

interface UploadImageProps {
  onUpload: Function;
  selectedImage: any;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onUpload,
  selectedImage,
}) => {
  const onDrop = (acceptedFiles: any, event: any) => {
    onUpload(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="UploadContainer">
      {selectedImage ? (
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
            onUpload(files[0]);
          }
        }}
      />
    </div>
  );
};
export default UploadImage;
