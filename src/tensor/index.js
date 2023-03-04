import "@tensorflow/tfjs";
import * as mobileNet from "@tensorflow-models/mobilenet";

export default async function run(img) {
  const version = 2;
  const alpha = 0.5;
  const model = await mobileNet.load({ version, alpha });
  const predictions = await model.classify(img);
  console.log(predictions[0].className);
}

export async function runfile(file) {
  let img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  const version = 2;
  const alpha = 0.5;
  const model = await mobileNet.load({ version, alpha });
  const predictions = await model.classify(img);
  localStorage.setItem("namatit", predictions[0].className);
  console.log(predictions[0].className);
  return predictions[0].className;
}
