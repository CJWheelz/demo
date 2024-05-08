import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';

import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

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

  const onQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // async function main() {
  //   const image = await openai.images.generate({ prompt: query });

  //   console.log(image.data[0].url);
  //   setImgAddress(image.data[0].url);
  // }

  async function generate3() {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: query,
      n: 1,
      size: '1024x1024',
    });

    setImgAddress(response.data[0].url);
  }

  return (
    <div>
      <h1>Welcome to CallistoGPT!</h1>

      <input type="text" name="Query" value={query} placeholder="Enter Your Image Query Here" id="" onChange={onQueryChange} />

      <button onClick={generate3} type="button">Generate</button>

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
