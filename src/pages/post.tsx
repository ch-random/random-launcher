// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import { getClient, Body, ResponseType } from "@tauri-apps/api/http";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";

function App() {
  async function post() {
    const client = await getClient();
    // https://github.com/tauri-apps/tauri/discussions/3253
    const res = await client.request({
      url: "https://random-launcher.fly.dev/articles",
      method: "POST",
      body: Body.json({
        title: "FontAwesome",
        body: "# Why Font Awesome?",
        public: true,
        user: {
          role: "admin",
          name: "takina",
        },
        articleGameContents: {
          execPath: "Neatly.exe",
          zipUrl:
            "https://drive.google.com/uc?export=download&id=1Sn08keQU9eSbGDvYja8_PhBPiegJ99V_",
        },
        articleOwners: [],
        articleTags: [
          {
            name: "アクション",
          },
        ],
        articleComments: [],
        articleImageUrls: [],
      }),
      responseType: ResponseType.Text,
    });
    console.log("res:", res);
  }
  return (
    <div>
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
      <div className="row">
        <div>
          <button type="button" onClick={() => post()}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
