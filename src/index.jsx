import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
// import require from 'dotenv';

import OpenAI from 'openai';

// require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true });

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
//     model: 'gpt-3.5-turbo',
//   });

//   console.log(completion.choices[0]);
// }

function Welcome(props) {
  const [query, setQuery] = useState('');
  const [imgAddress, setImgAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // async function main() {
  //   const image = await openai.images.generate({ prompt: query });

  //   console.log(image.data[0].url);
  //   setImgAddress(image.data[0].url);
  // }

  async function generate3() {
    setIsLoading(true);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: query,
      n: 1,
      size: '1024x1024',
    });

    setIsLoading(false);
    setImgAddress(response.data[0].url);
  }

  // async function varyImage() {
  //   const response = await openai.images.createVariation({
  //     model: 'dall-e-2',
  //     image: fs.createReadStream('images/photo.jpeg'),
  //     n: 1,
  //     size: '1024x1024',
  //   });
  //   image_url = response.data[0].url;
  // }

  function renderLoad() {
    return (
      <div>
        <div className="spinner-border" role="status">
          <span className="sr-only" />
        </div>
        <p>
          Loading ...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to CallistoGPT!</h1>

      <input type="text" name="Query" value={query} placeholder="Enter Your Image Query Here" id="" onChange={onQueryChange} />

      <button onClick={generate3} className="btn btn-primary" type="button">Generate</button>
      <br />
      { isLoading ? renderLoad() : <div />}

      <img src={imgAddress} alt="" />
    </div>
  );
}

function App(props) {
  return (
    <div>
      <Welcome />
    </div>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
