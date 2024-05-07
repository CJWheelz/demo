import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import './style.scss';

import OpenAI from 'openai';
import Counter from './components/counter';
import Controls from './components/controls';

const openai = new OpenAI({ apiKey: 'sk-proj-qfQNej1PltxUxhbXKHMVT3BlbkFJzhUgfPX0ttYX0ABt76ps', dangerouslyAllowBrowser: true });

// async function main() {
//   const image = await openai.images.generate({ prompt: 'A cute baby sea otter' });

//   console.log(image.data);
// }

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
}

function About(props) {
  return <div> All there is to know about me </div>;
}
function Welcome(props) {
  return (
    <div>
      <div>Welcome</div>

      <button onClick={main} type="button">Generate</button>

      <Counter />
      <Controls />
    </div>
  );
}
function Test(props) {
  const { id } = useParams();
  return <div> ID: {id} </div>;
}
function FallBack(props) {
  return <div>URL Not Found</div>;
}

function Nav(props) {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
}

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
// function App() {
//   return <div className="test">All the REACT are belong to us!</div>;
// }

const root = createRoot(document.getElementById('main'));
root.render(<App />);
