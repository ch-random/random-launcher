import { useEffect, useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
// https://react-icons.github.io/react-icons/icons?name=fa
import {
  FaAngleDoubleLeft,
  FaPlay,
  FaUser,
  FaShapes,
  FaTv,
  FaHandPaper,
  FaGamepad,
  FaKeyboard,
  FaStarHalfAlt,
  FaRegSmileBeam,
} from "react-icons/fa";

import { Article } from "../../domain/models";
import { isNullOrUndefined } from "../../utils/utils";
import { getArticles, getAllPaths } from "../../repository/fly/fly";

export default function App({ id }: { id: string }) {
  const [article, setArticle] = useState<Article>(null);
  useEffect(
    () => {
      try {
        getArticles().then((articles: Map<string, Article>) => {
          setArticle(articles[id]);
          // console.log("(useEffect) articles[id]:", articles[id]);
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
      {isNullOrUndefined(article) ? (
        "Loading..."
      ) : article.public ? (
        <>
          {/* 戻る */}
          <div className="content mt-4">
            <div className="columns">
              <div className="column is-one-fifth mx-1">
                <a href="/" className="button is-fullwidth is-link is-outlined">
                  <span className="icon m-0">
                    <FaAngleDoubleLeft />
                  </span>
                  戻る
                </a>
              </div>
            </div>
          </div>
          {/* article */}
          <div className="box m-2">
            <div className="content p-2 columns">
              <div className="column is-7">
                <h1 className="title">{article.title}</h1>
                <div className="is-size-5">
                  作成: {article.created_at}、更新: {article.updated_at}
                </div>
              </div>
              <div className="column is-5">
                <a className="button is-fullwidth mt-4 is-primary is-outlined is-large">
                  <span className="icon m-0">
                    <FaPlay />
                  </span>
                  プレイ
                </a>
              </div>
            </div>
            <div className="content tile is-ancestor">
              <div className="tile is-parent is-7 p-2">
                <div className="tile is-child">
                  <div
                    className="image is-5by3"
                    style={{ border: "1px solid" }}
                  >
                    <img
                      src={article.article_image_urls[0].image_url}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        margin: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="tile is-parent is-5 p-2 is-vertical">
                <div className="tile is-child">
                  <div className="is-size-5 pt-2 px-2">
                    <div>
                      <span className="icon m-0 is-large">
                        <FaUser />
                      </span>
                      {article.article_owners
                        .map((o) => o.user.name)
                        .join("、")}
                    </div>
                    <div>
                      <span className="icon m-0 is-large">
                        <FaShapes />
                      </span>
                      {article.article_tags.map((t) => (
                        <span key={t.id}>
                          <span className="icon m-0">
                            <FaTv />
                          </span>
                          {t.name}
                        </span>
                      ))}
                    </div>
                    <div>
                      <span className="icon m-0 is-large">
                        <FaHandPaper />
                      </span>
                      <span className="icon m-0">
                        <FaGamepad />
                      </span>
                      コントローラ/
                      <span className="icon m-0">
                        <FaKeyboard />
                      </span>
                      キーボード
                    </div>
                  </div>
                </div>
                <div
                  className="tile is-child py-1"
                  style={{ display: "grid", alignItems: "flex-end" }}
                >
                  <h2 className="is-size-4">ギャラリー</h2>
                  <div className="columns mt-2 is-mobile">
                    {article.article_image_urls.map((aiu) => (
                      <div key={aiu.id} className="column is-4">
                        <div className="image is-5by3">
                          <img src={aiu.image_url} width="200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ marginBottom: "8px", marginTop: "8px" }} />
            <div className="content columns">
              <div className="column is-7">
                <h2 className="is-size-4">概要</h2>
                <div className="p-2">{article.body}</div>
              </div>
              <div className="column is-5">
                <div className="columns">
                  <div className="column is-5">
                    <h2 className="is-size-4">評価</h2>
                  </div>
                  <div className="column is-7">
                    <div className="button is-link is-outlined is-fullwidth">
                      <span className="icon m-0">
                        <FaStarHalfAlt />
                      </span>
                      評価する
                    </div>
                  </div>
                </div>
                <div className="is-size-1 has-text-centered m-2">
                  <span className="icon">
                    <FaRegSmileBeam />
                  </span>
                  Good
                </div>
              </div>
            </div>
          </div>

          {/* <h1>{article.title}</h1>
          <i>{article.created_at}</i>
          <i>{article.updated_at}</i>
          {article.article_tags.map((t) => (
            <p>{t.name}</p>
          ))}
          {article.article_owners.map((o) => (
            <p>{o.user.name}</p>
          ))} */}
          {/* {article.article_image_urls.map((aiu) => (
            <img src={aiu.image_url} width="200" />
          ))} */}
          <p>{article.article_game_content.exec_path}</p>
          <p>{article.article_game_content.zip_url}</p>
          {article.article_comments.map((ac) => {
            <div key={ac.id}>
              <p>{ac.rate}</p>
              <i>{ac.created_at}</i>
              <i>{ac.updated_at}</i>
              <p>{ac.body}</p>
            </div>;
          })}
        </>
      ) : (
        "401 Unauthorized"
      )}
    </div>
  );
}

// https://reffect.co.jp/react/next-js
export async function getServerSidePaths() {
  const paths = await getAllPaths();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getServerSideProps({ params: { id } }) {
  return {
    props: {
      id,
    },
  };
}
