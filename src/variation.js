import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";
import { createReadStream, writeFileSync } from 'fs'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_TOKEN
})

const openai = new OpenAIApi(configuration)

const src = 'as meninas.png'

try {
  const response = await openai.createImageVariation(
    createReadStream(`../source_images/${src}`),
    1,
    "512x512"
  );
  const url = response.data.data[0].url

  // saving image locally
  const imgResult = await fetch(url)
  const blob = await imgResult.blob()
  const buffer = Buffer.from(await blob.arrayBuffer())
  writeFileSync(`../exported_images/${src.split('.')[0]}-variation_${Date.now()}.png`, buffer)
  // console.log(response.data.data[0].url);
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
}