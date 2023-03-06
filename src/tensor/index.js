import "@tensorflow/tfjs";
import * as mobileNet from "@tensorflow-models/mobilenet";

export default async function runfile(file) {
  let img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  const version = 2;
  const alpha = 0.5;
  try {
    const model = await mobileNet.load({ version, alpha });
    const predictions = await model.classify(img);
    localStorage.setItem("namatit", predictions[0].className);
    console.log("asssiappp", predictions[0].className);
  } catch (err) {
    console.log("error", err);
  }

  return true;
}
