# Testing Dall•e's API

Playing around with the Dall•E 2 API exploring its 3 main features:

- generate images based on text prompts
- create random variations of an image
- edit an image based on a transparent .png mask

This project was built using:

- OpenAI’s Dall•E API
- Node.js
- Node’s fs module / to interact with the file system and save the images locally
- dotenv / to hide API keys from public access

to use it:

- clone the repo
- `npm i` to install 'dotenv' and 'openai' dependencies
- don't forget to create a free account on openai's website and get an API key to use it on the configuration part of each file
- place some images on the source_images folder
- fill in the prompt you want and
- open the terminal on the src folder
- enter `node generate.js` | `node variation.js` | `node edit.js` based on the feature you want to test
