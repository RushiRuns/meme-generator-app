import { useState, useEffect } from "react";
// import { Button } from "./components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./components/ui/card";
// import memesData from "../memesData";
import "./App.css";
import { data } from "autoprefixer";

function App() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div className="meme-container">
      <input
        type="text"
        name="topText"
        placeholder="top text"
        onChange={handleChange}
        value={meme.topText}
        className="inp"
      />
      <input
        type="text"
        name="bottomText"
        placeholder="bottom text"
        onChange={handleChange}
        value={meme.bottomText}
        className="inp"
      />
      <button onClick={getMemeImage}>Get Meme</button>
      <div className="div">
        <img src={meme.randomImage} alt="" />
        <p className="text-top">{meme.topText}</p>
        <p className="text-bottom">{meme.bottomText}</p>
      </div>
    </div>
  );
}

export default App;
