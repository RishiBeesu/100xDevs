import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <Card
        name="Rishi Beesu"
        description="MERN Developer"
        interests={["Video Games", "Shadow work", "Anime"]}
      ></Card>
    </>
  );
}

function Card(props) {
  console.log("In card");
  return (
    <div>
      <h1>{props.name}</h1>
      <div>{props.description}</div>
      <h2>Interests</h2>
      <div>
        {props.interests.map((interest) => {
          return <div>interest</div>;
        })}
      </div>
      <br />
      <div>
        <a href="">LinkedIn</a>
      </div>
      <div>
        <a href="">Twitter</a>
      </div>
    </div>
  );
}

export default App;
