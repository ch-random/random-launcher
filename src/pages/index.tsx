import { useEffect, useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";
// https://react-icons.github.io/react-icons/icons?name=fa
import {
  FaCloudUploadAlt,
  FaHome,
  FaTv,
  FaHeadphones,
  FaPaintBrush,
  FaUnity,
  FaList,
} from "react-icons/fa";

import { Article } from "../domain/models";
import { isNullOrUndefined } from "../utils/utils";
import { getArticles } from "../repository/fly/fly";

export default function App() {
  // Game
  const [articleDict, setArticleDict] =
    useState<Map<string, Map<string, Article>>>(null);
  const availTagsDict = {
    games: {
      jp: "ゲーム",
      icon: <FaTv />,
    },
    music: {
      jp: "音楽",
      icon: <FaHeadphones />,
    },
    illusts: {
      jp: "イラスト",
      icon: <FaPaintBrush />,
    },
    others: {
      jp: "その他",
      icon: <FaList />,
    },
  };
  useEffect(
    () => {
      try {
        getArticles().then((as: Map<string, Article>) => {
          let ad = new Map<string, Map<string, Article>>();
          for (let key in availTagsDict) {
            ad[key] = new Map<string, Article>();
          }
          for (const id in as) {
            const a: Article = as[id];
            let key = "others";
            for (const t in a.article_tags) {
              if (Object.keys(availTagsDict).includes(t)) {
                key = t;
                break;
              }
            }
            console.log("key:", key);
            console.log("id:", id);
            console.log("ad[key]:", ad[key]);
            console.log("ad[key][id]:", ad[key][id]);
            ad[key][id] = a;
          }
          setArticleDict(ad);
        });
      } catch (e) {
        console.log("failed to run getArticles", e);
      }
    },
    // マウント時のみ useEffect する
    []
  );
  return (
    <div className="container">
      {/* <div className="content mt-4 mx-4">
        <a href="/" className="button is-fullwidth is-link is-outlined">
          <span className="icon m-0">
            <FaCloudUploadAlt />
          </span>
          作品投稿フォーム (部員用、未完成)
        </a>
      </div> */}
      <div className="content mt-4 mx-4">
        <div className="columns">
          {/* <div className="column is-one-fifth">
            <a className="button is-fullwidth is-link is-outlined">
              <span className="icon m-0">
                <FaHome />
              </span>
              ホーム
            </a>
          </div> */}

          {isNullOrUndefined(articleDict)
            ? "Loading..."
            : Object.keys(availTagsDict).map((t) => {
                return (
                  <div
                    key={availTagsDict[t].jp}
                    className="column is-one-fourth"
                  >
                    <a
                      href={"#" + t}
                      className="button is-fullwidth is-link is-outlined"
                    >
                      <span className="icon m-0">{availTagsDict[t].icon}</span>
                      {availTagsDict[t].jp}
                    </a>
                  </div>
                );
              })}
        </div>
      </div>

      <div className="box m-2">
        <div className="content">
          {isNullOrUndefined(articleDict)
            ? "Loading..."
            : Object.keys(availTagsDict).map((t: string) => {
                return (
                  <div key={t}>
                    <h1 id={t}>{availTagsDict[t].jp}</h1>
                    <div
                      className="tile is-ancestor"
                      style={{ overflowX: "auto" }}
                    >
                      {Object.values(articleDict[t]).map((a: Article) => {
                        return (
                          <div key={a.id} className="tile is-parent is-3">
                            <a
                              href={"/articles/" + a.id}
                              className="tile is-child card p-2"
                            >
                              <div className="image is-5by3">
                                <img
                                  src={a.article_image_urls[0].image_url}
                                  style={{ borderRadius: "5px" }}
                                />
                              </div>
                              <div className="has-text-centered is-size-4">
                                <span className="icon">
                                  <span className="icon m-0">
                                    {availTagsDict[t].icon}
                                  </span>
                                </span>
                                {a.title}
                              </div>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
