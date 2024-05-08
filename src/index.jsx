import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';

import OpenAI from 'openai';

const key = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

function Welcome(props) {
  const [query, setQuery] = useState('');
  const [imgAddress, setImgAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('2');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const onQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // GENERATE IMAGE
  async function generate() {
    setIsLoading(true);

    const modelNumber = `dall-e-${selectedOption}`;

    const response = await openai.images.generate({
      model: modelNumber,
      prompt: query,
      n: 1,
      size: '1024x1024',
    });

    setIsLoading(false);
    setImgAddress(response.data[0].url);
  }

  // GENERATE TEXT RESPONSE
  const [text, setText] = useState('');
  const [textQuery, setTextQuery] = useState('');
  const onTextQueryChange = (event) => {
    setTextQuery(event.target.value);
  };
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: textQuery }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices[0].message.content);
    setText(completion.choices[0].message.content);
  }

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
      <div className="container">
        <div className="row align-items-end">
          <div className="col-6 align-self-end">
            <input type="text" className="form-control" name="Query" value={query} placeholder="Enter Your Image Query Here" id="" onChange={onQueryChange} />
          </div>

          <div className="col-3 align-self-start">
            <h5>Which Model?</h5>
            <select value={selectedOption} onChange={handleDropdownChange} className="form-select">
              <option value="2">DALL-E-2</option>
              <option value="3">DALL-E-3</option>
            </select>
          </div>

          <div className="col-3">
            <button onClick={generate} className="btn btn-primary" type="button">Generate Image</button>
          </div>
        </div>
      </div>

      <br />

      { isLoading ? renderLoad() : <div />}

      <img src={imgAddress} alt="" />

      <br />
      <hr />

      <div className="container">
        <div className="row align-items-end">
          <div className="col-6">
            <input type="text" className="form-control" name="Query" value={textQuery} placeholder="Enter Your Text Query Here" id="" onChange={onTextQueryChange} />
          </div>
          <div className="col-4">
            <button onClick={main} className="btn btn-primary" type="button">Generate Text</button>
          </div>
        </div>
        <br />
        <p>{text}</p>

      </div>

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
