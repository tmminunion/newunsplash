import "@tensorflow/tfjs";
import * as mobileNet from "@tensorflow-models/mobilenet";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function runfile(file) {
  // getTenses("Kamu sedang belajar AI");
  let img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  const version = 2;
  const alpha = 0.5;

  const model = await mobileNet.load({ version, alpha });

  const predictions = await model.classify(img);
  localStorage.setItem("namatit", predictions[0].className);
  getTenses(predictions[0].className);
  console.log("asssiappp", predictions[0].className);

  return true;
}

export async function getTenses(className) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(className),
    temperature: 0.6,
  });
  const result = completion.data.choices[0].text;
  localStorage.setItem("Description_Image", result);
  console.log("deskripsi ", result);
}

export function generatePrompt(kata) {
  const capitalizedAnimal = kata[0].toUpperCase() + kata.slice(1).toLowerCase();
  return `deskripsikan sebuah kalimat dari terjemahan ${capitalizedAnimal}`;
}
