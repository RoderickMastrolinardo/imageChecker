import { useState } from "react";
import { uploadImage, compareFaces } from "./Api/ApiCalls";
import "./App.css";
import UploadImage from "./components/UploadImage.component";

const App = () => {
  const [leftIamge, setLeftImage] = useState<
    string | ArrayBuffer | null | "error"
  >(null);
  const [rightImage, setRightImage] = useState<
    string | ArrayBuffer | null | "error"
  >(null);
  const [leftFace, setLeftFace] = useState<{ faceId: string }>({ faceId: "" });
  const [rightFace, setRightFace] = useState<{ faceId: string }>({
    faceId: "",
  });
  const [loading, setLoading] = useState(false);
  const [identical, setIdentical] = useState("NO");
  const [result, setResult] = useState("");

  const compareImages = async () => {
    setLoading(true);
    const compareResults = await compareFaces(leftFace, rightFace);
    if (compareResults) {
      setIdentical(compareResults.isIdentical ? "SÍ" : "NO");
      setResult(`${compareResults.confidence * 100} %`);
    }
    setLoading(false);
  };
  const resetImages = () => {
    setLeftImage(null);
    setRightImage(null);
    setLeftFace({ faceId: "" });
    setRightFace({ faceId: "" });
    setIdentical("NO");
    setResult("");
  };
  return (
    <div className="App">
      <header className="App-header">
        <p className="Logo">Picture checker</p>
      </header>
      {leftFace.faceId === "" || rightFace.faceId === "" ? (
        <h1>Sube las imágenes</h1>
      ) : null}
      <div className="Uploads">
        <UploadImage
          onUpload={async (file: any) => {
            if (!file) {
              setResult("");
              setIdentical("NO");
              setLeftFace({ faceId: "" });
              return setLeftImage(null);
            }
            const image = await uploadImage(file);
            if (!image) {
              setResult("");
              setIdentical("NO");
              setLeftFace({ faceId: "" });
              return setLeftImage("error");
            }
            setLeftFace(image);
            const reader = new FileReader();
            reader.addEventListener("load", async () => {
              setLeftImage(reader.result);
            });
            reader.readAsDataURL(file);
          }}
          selectedImage={leftIamge}
        />
        <UploadImage
          onUpload={async (file: any) => {
            if (!file) {
              setResult("");
              setIdentical("NO");
              setRightFace({ faceId: "" });
              return setRightImage(null);
            }
            const image = await uploadImage(file);
            if (!image) {
              setResult("");
              setIdentical("NO");
              setRightFace({ faceId: "" });
              return setRightImage("error");
            }
            setRightFace(image);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setRightImage(reader.result);
            });
            reader.readAsDataURL(file);
          }}
          selectedImage={rightImage}
        />
      </div>
      {result && !loading ? (
        <>
          <div>
            <h2>Resultados: {result}</h2>
            <h1>Son iguales? {identical}</h1>
          </div>
          <button disabled={loading} onClick={resetImages} className="button">
            Comenzar de nuevo
          </button>
        </>
      ) : (
        <>
          {leftFace.faceId !== "" && rightFace.faceId !== "" ? (
            <button
              disabled={loading}
              onClick={compareImages}
              className="button"
            >
              {!loading ? "Comparar" : "Cargando"}
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
