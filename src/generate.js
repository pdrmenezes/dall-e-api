import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from 'fs'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_TOKEN
})

const openai = new OpenAIApi(configuration)

try {
  const prompt = 'dog surfing on a sunny day on the moon'
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
    user: 'lovelyUser'
  })
  const url = response.data.data[0].url

  // saving image locally
  const imgResult = await fetch(url)
  const blob = await imgResult.blob()
  const buffer = Buffer.from(await blob.arrayBuffer())
  writeFileSync(`../exported_images/generated_${Date.now()}.png`, buffer)
  console.log(response.data.data[0].url);
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
}