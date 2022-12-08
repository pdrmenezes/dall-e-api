import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";
import { createReadStream, writeFileSync } from 'fs'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_TOKEN
})

const openai = new OpenAIApi(configuration)

try {
  const src = 'tarsila-operarios.png'
  const mask = 'tarsila-operarios-mask.png'
  const response = await openai.createImageEdit(
    createReadStream(`../source_images/${src}`),
    createReadStream(`../source_images/${mask}`),
    "painting of people in front of power plants",
    1,
    "512x512"
  )
  const url = response.data.data[0].url

  // saving image locally
  const imgResult = await fetch(url)
  const blob = await imgResult.blob()
  const buffer = Buffer.from(await blob.arrayBuffer())
  writeFileSync(`../exported_images/${src.split('.')[0]}-edited_${Date.now()}.png`, buffer)
  // console.log(response.data.data[0].url);
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
}