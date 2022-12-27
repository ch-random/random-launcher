import { useEffect, useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../../assets/react.svg";
import tauriLogo from "../../assets/tauri.svg";
import nextLogo from "../../assets/next.svg";

import { Article } from "../../domain/models";
import { isNullOrUndefined } from "../../utils/utils";
import { getArticles, getAllPaths } from "../../repository/fly/fly";

export default function App({ id }: { id: string }) {
  const [article, setArticle] = useState<Article>(null);
  useEffect(() => {
    try {
      getArticles().then((articles: Map<string, Article>) => {
        setArticle(articles[id]);
        // console.log("(useEffect) articles[id]:", articles[id]);
      });
    } catch (e) {
      console.log("failed to run getArticles", e);
    }
  });
  return (
    <>
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
      {isNullOrUndefined(article) ? (
        "Loading..."
      ) : article.public ? (
        <>
          <h1>{article.title}</h1>
          <i>{article.created_at}</i>
          <i>{article.updated_at}</i>
          {article.article_tags.map((t) => (
            <p>{t.name}</p>
          ))}
          {article.article_owners.map((o) => (
            <p>{o.user.name}</p>
          ))}
          {article.article_image_urls.map((aiu) => (
            <img src={aiu.image_url} width="200" />
          ))}
          <p>{article.body}</p>
          <p>{article.article_game_content.exec_path}</p>
          <p>{article.article_game_content.zip_url}</p>
          {article.article_comments.map((ac) => {
            <>
              <p>{ac.rate}</p>
              <i>{ac.created_at}</i>
              <i>{ac.updated_at}</i>
              <p>{ac.body}</p>
            </>;
          })}
        </>
      ) : (
        "401 Unauthorized"
      )}
    </>
  );
}

// https://reffect.co.jp/react/next-js
export async function getStaticPaths() {
  const paths = await getAllPaths();
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  return {
    props: {
      id,
    },
  };
}
