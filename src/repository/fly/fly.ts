// import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
// import dynamic from "next/dynamic";
// import useSWR from "swr";

import { Article } from "../../domain/models";

// const Canvas = dynamic(() => import("@components/.../Canvas"), {
//   ssr: false, // <- ここで ssr を無効にするオプションを渡す
// });

export async function getArticles() {
  // let articles: Map<string, Article> = await invoke("get_articles");
  // console.log("articles:", articles);

  // let articles = invoke<Map<string, Article>>("greet", { name: "nickname" });
  let articles = invoke<Map<string, Article>>("get_articles");

  // await invoke("get_articles")?.then((as) => {
  //   console.log("(getArticles) as:", as);
  // });

  // articles.set(as);
  // for (let k in as) {
  //   articles.set(k, as[k]);
  // }

  // let articles = new Map<string, Article>([
  //   [
  //     "91aa7215-8f02-4f11-a34b-0c088b4eecab",
  //     {
  //       id: "91aa7215-8f02-4f11-a34b-0c088b4eecab",
  //       created_at: "created_at_a",
  //       updated_at: "updated_at_a",
  //       title: "title_a",
  //       body: "body_a",
  //       public: true,
  //       user_id: "user_id",
  //       user: {
  //         id: "id_u",
  //         created_at: "created_at_u",
  //         updated_at: "updated_at_u",
  //         google_id: "google_id_u",
  //         role: "role_u",
  //         name: "name_u",
  //       },
  //       article_game_content: {
  //         id: "id_u",
  //         created_at: "created_at_agc",
  //         updated_at: "updated_at_agc",
  //         exec_path: "Neatly.exe",
  //         zip_url:
  //           "https://drive.google.com/uc%3Fexport%3Ddownload%26id%3D1Sn08keQU9eSbGDvYja8_PhBPiegJ99V_",
  //       },
  //       article_owners: [],
  //       article_tags: [
  //         {
  //           name: "アクション",
  //         },
  //       ],
  //       article_comments: [
  //         {
  //           created_at: "created_at_ac",
  //           updated_at: "updated_at_ac",
  //           body: "test",
  //           rate: 5,
  //         },
  //       ],
  //       article_image_urls: [
  //         {
  //           image_url:
  //             "https://www.famitsu.com/images/000/260/379/y_6274fb3411310.jpg",
  //         },
  //       ],
  //     },
  //   ],
  // ]);
  // console.log("(getArticles) articles:", articles);
  return articles;
}

export async function getAllPaths() {
  // Error: Window is not defined
  const articles = await getArticles();
  console.log("(getAllPaths) articles:", articles);
  const keys = [...articles.keys()];

  // const keys = [""];

  // console.log("keys:", keys);

  let paths = keys.map((key) => {
    return { params: { id: key } };
  });
  console.log("paths:", paths);

  return paths;
}
