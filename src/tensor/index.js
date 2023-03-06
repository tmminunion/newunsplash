import "@tensorflow/tfjs";
import * as mobileNet from "@tensorflow-models/mobilenet";
import axios from "axios";

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

export async function getTenses() {
  try {
    const apiKey = "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";
    const data = {
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 0.6,
    };

    axios
      .post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        const result = response.data.choices[0].text;
        localStorage.setItem("Description_Image", result);
        console.log("deskripsi ", result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log("KATA Eror : ", err);
  }
}

export function generatePrompt() {
  const kata = localStorage.getItem("namatit");
  const capitalizedAnimal = kata[0].toUpperCase() + kata.slice(1).toLowerCase();
  return `deskripsikan sebuah kalimat dari terjemahan ${capitalizedAnimal}`;
}
