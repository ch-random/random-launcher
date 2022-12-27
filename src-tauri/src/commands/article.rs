use crate::domain::models::*;

use anyhow::Result;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
// use std::thread;
use futures::stream::{self, StreamExt as _, TryStreamExt as _};
use tauri::State;

const ARTICLES: &str = "https://random-launcher.fly.dev/articles";

pub struct ArticleManager {
    articles: Arc<Mutex<HashMap<String, Article>>>,
}

impl ArticleManager {
    pub fn new(articles: HashMap<String, Article>) -> Self {
        Self {
            articles: Arc::new(Mutex::new(articles)),
        }
    }
    pub fn get_articles(&self) -> HashMap<String, Article> {
        let c_articles = Arc::clone(&self.articles);
        let c_articles = c_articles.lock().unwrap();
        c_articles.clone()
    }
    pub async fn insert_article(&self, article: ReducedArticle) -> Result<()> {
        let client = reqwest::Client::new();
        let res = client.post(ARTICLES).form(&article).send().await?;
        eprintln!("res: {:?}", res);

        // let c_articles = Arc::clone(&self.articles);
        // thread::spawn(move || {
        //     let mut articles = c_articles.lock().unwrap();
        //     let id = article.clone().id;
        //     articles.insert(id, article);
        // }).join().expect("thread::spawn failed");
        Ok(())
    }
    pub fn update_article(&self, article: ReducedArticle) -> Result<()> {
        eprintln!("article: {:?}", article);
        Ok(())
    }
}

// https://rust-lang-nursery.github.io/rust-cookbook/web/clients/apis.html
pub async fn fetch_articles() -> Result<HashMap<String, Article>> {
    let resp = reqwest::get(ARTICLES).await.expect("failed to parse resp");
    // eprintln!("resp: {:?}", resp);

    // let txt = resp.text().await?;
    // eprintln!("txt: {:?}", txt);

    // let mps = resp.json::<Vec<HashMap<String, String>>>().await.expect("failed to parse mps");
    // eprintln!("mps: {:?}", mps);

    let articles: Vec<Article> = resp.json().await.expect("failed to parse articles");
    eprintln!("(fetch_articles) articles: {:?}", articles);
    // let dt = DateTime::parse_from_rfc3339("");
    // let articles = vec![];
    // download_if_not_exists(a)
    match download_if_not_exists(articles.clone()).await {
        Ok(res) => println!("res: {}", res),
        Err(err) => eprintln!("err {}", err),
    }
    let articles = {
        let mut new_articles = HashMap::new();
        for a in articles {
            let id = a.id.clone();
            new_articles.insert(id, a);
        }
        new_articles
    };
    Ok(articles)
}

#[tauri::command]
pub fn get_articles(
    manager: State<'_, ArticleManager>,
) -> Result<HashMap<String, Article>, String> {
    let articles = manager.get_articles();
    Ok(articles)
}
#[tauri::command]
pub async fn insert_article(
    manager: State<'_, ArticleManager>,
    article: ReducedArticle,
) -> Result<(), String> {
    manager
        .insert_article(article)
        .await
        .expect("failed to insert an article");
    Ok(())
}
#[tauri::command]
pub fn update_article(
    manager: State<'_, ArticleManager>,
    article: ReducedArticle,
) -> Result<(), String> {
    manager
        .update_article(article)
        .expect("failed to update an article");
    Ok(())
}

fn download_if_not_exists(
    articles: Vec<Article>,
) -> impl futures::Future<Output = Result<String>> {
    // use futures::{StreamExt as _, TryStreamExt as _};
    stream::iter(articles)
        .map(|a| {
            tokio::spawn(async move {
                // ./data/{id}/ に a.article_game_content.zip_url が DL 済みでないなら DL して解凍
                let url = a.article_game_content.zip_url;
                eprintln!("url: {:?}", url);
                Ok("ok")
            })
        })
        .buffered(3)
        .map(|x| x?)
        .try_fold(String::new(), |acc, x| async move {
            println!("(try_fold) res: {}", x);
            Ok(format!("{}:{}", acc, x))
        })
}
