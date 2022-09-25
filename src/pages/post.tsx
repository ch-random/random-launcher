// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import { getClient, Body, ResponseType } from "@tauri-apps/api/http";
import Image from "next/image";
import tauriLogo from "../assets/tauri.svg";

function App() {
  async function post() {
    const client = await getClient({ connectTimeout: 2, maxRedirections: 3 });
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
          name: "chisato",
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
      <span className="logos">
        <a href="/games/id">
          <Image
            width={144}
            height={144}
            src={tauriLogo}
            className="logo tauri"
            alt="Tauri logo"
          />
        </a>
      </span>
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
