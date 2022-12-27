import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";


export default function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
      <div className="container">
        <h1>Welcome to Tauri!</h1>

        <div className="row">
          <span className="logos">
            <a href="/post">
              <Image
                width={144}
                height={144}
                src={nextLogo}
                className="logo next"
                alt="Next logo"
              />
            </a>
          </span>
          <span className="logos">
            <a href="/games/3846f3a1-bd4e-4bbf-9fc1-a376df1258fa">
              <Image
                width={144}
                height={144}
                src={tauriLogo}
                className="logo tauri"
                alt="Tauri logo"
              />
            </a>
          </span>
          <span className="logos">
            <a href="https://reactjs.org" target="_blank">
              <Image
                width={144}
                height={144}
                src={reactLogo}
                className="logo react"
                alt="React logo"
              />
            </a>
          </span>
        </div>

        <p>
          Click on the Tauri, Next, and React logos to learn more about each
          framework.
        </p>

        <div className="row">
          <div>
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter a name..."
            />
            <button type="button" onClick={() => greet()}>
              {/* tailWindCSS: className="px-4 py-2 focus:outline-none text-white font-bold rounded focus:bg-sky-500 bg-sky-600 hover:bg-sky-700" */}
              Greet
            </button>
          </div>
        </div>

        <p>{greetMsg}</p>
      </div>
    </>
  );
}
