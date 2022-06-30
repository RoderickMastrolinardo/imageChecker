import axios from "axios";

const domain = "https://banescoregognize.cognitiveservices.azure.com";
const key = "c2e6a9712f25424fac97f63684884dc8";

export const uploadImage = (result: any) => {
  const headers = {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": key,
  };
  const data = result;
  return axios
    .post(`${domain}/face/v1.0/detect?returnFaceId=true`, data, {
      headers,
    })
    .then((res: any) => {
      if (res.data.length > 0) {
        return res.data[0];
      }
    })
    .catch((err) => alert("ha ocurrido un error subiendo la imagen"));
};

export const compareFaces = (
  leftFace: { faceId: string },
  rightFace: { faceId: string }
) => {
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": key,
  };
  const data = { faceId1: leftFace.faceId, faceId2: rightFace.faceId };
  return axios
    .post(`${domain}/face/v1.0/verify`, data, {
      headers,
    })
    .then((res: any) => {
      return res.data;
    })
    .catch((err) => alert("ha ocurrido un error comparando las imagenes"));
};
