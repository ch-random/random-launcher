#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod domain;

use anyhow::Result;
use commands::article::{self, ArticleManager};
// use futures::executor::block_on;
use tauri::Manager;
use article::*;

// #[derive(Default)]
// struct MyState {
//   s: std::sync::Mutex<String>,
//   t: std::sync::Mutex<std::collections::HashMap<String, String>>,
// }
// // remember to call `.manage(MyState::default())`
// #[tauri::command]
// async fn command_name(state: tauri::State<'_, MyState>) -> Result<(), String> {
//   *state.s.lock().unwrap() = "new string".into();
//   state.t.lock().unwrap().insert("key".into(), "value".into());
//   Ok(())
// }

// #[tauri::command]
// fn command_with_object(message: MyMessage) -> MyMessage {
//     let MyMessage {
//         field_str,
//         field_u32,
//     } = message;

//     MyMessage {
//         field_str: format!("hello {}", field_str),
//         field_u32: field_u32 + 1,
//     }
// }

// #[tauri::command]
// fn post_article(article: &Article) -> String {
//     let id = article.id;
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// async fn manage_articles(app: &mut App) -> Result<()> {
//     let articles = article::fetch_articles().await?;
//     let article_manager = ArticleManager::new(articles);
//     app.manage(article_manager);
//     Ok(())
// }

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let handle = tokio::spawn(async {
        fetch_articles()
            .await
            .expect("faild to fetch articles")
    });
    let articles = handle.await.expect("failed to handle articles");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_articles,
            insert_article,
            update_article,
        ])
        .setup(|app| {
            // block_on(async {
            //     let articles = article::fetch_articles().await?;
            //     let article_manager = ArticleManager::new(articles);
            //     app.manage(article_manager);
            // });
            let article_manager = ArticleManager::new(articles);
            app.manage(article_manager);
            // block_on(manage_articles(app)).expect("failed to fetch articles");

            // Show devtools
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    Ok(())
}

// use anyhow::{Context, Result};
// use futures::future::try_join_all;
// use reqwest::header;
// use serde_json::Value;
// use std::sync::Arc;
// use tokio::task::JoinHandle;
//
// // ?????????????????? API ????????????????????????????????????????????????
// async fn get_star_count(client: &reqwest::Client, repo: String) -> Result<u64> {
//     let resp: Value = client
//         .get(&format!("https://api.github.com/repos/{}", repo))
//         .send()
//         .await? // API ????????????????????????
//         .json()
//         .await?; // JSON ?????????????????????
//     let count = resp
//         .get("stargazers_count")
//         .context("GitHub API error: stargazers_count is not found")?
//         .as_u64()
//         .context("GitHub API error: stargazers_count is not an integer")?;
//     Ok(count)
// }
//
// #[tokio::main]
// async fn main() -> Result<()> {
//     // HTTP request header ??? user agent ??????????????????
//     let mut headers = header::HeaderMap::new();
//     headers.insert(
//         header::ACCEPT,
//         header::HeaderValue::from_static("application/vnd.github.v3+json"),
//     );
//
//     let client = reqwest::Client::builder()
//         .user_agent("rust reqwest")
//         .default_headers(headers)
//         .build()?;
//     // ???????????????????????????????????????????????????Arc ???????????????
//     let client = Arc::new(client);
//
//     // ?????????????????????????????????????????????
//     let repos = vec![
//         "rust-lang-nursery/failure".to_string(),
//         "rust-lang-nursery/lazy-static.rs".to_string(),
//         "rust-lang/libc".to_string(),
//         "bitflags/bitflags".to_string(),
//         "rust-lang/log".to_string(),
//     ];
//
//     // spawn ?????????????????????????????????????????????
//     let handles: Vec<JoinHandle<Result<u64>>> = repos
//         .iter()
//         .map(|repo| {
//             // tokio::spawn ??? 'static ????????????????????????clone ??????????????????
//             let client = client.clone();
//             let repo = repo.clone();
//
//             // client ??? repo ??? move ?????????
//             tokio::spawn(async move {
//                 // ???????????????????????????????????? Result<u64> ??????
//                 get_star_count(&client, repo).await
//             })
//         })
//         .collect::<Vec<_>>();
//
//     // repos ?????????????????????????????????
//     let stars: Vec<u64> = try_join_all(handles) // Vec<Result<T>> ??? Result<Vec<T>> ???????????????????????????
//         .await?
//         .into_iter()
//         .collect::<Result<Vec<u64>>>()?; // Vec<Result<T>> ??? Result<Vec<T>> ??????????????????
//
//     for (repo, star) in repos.iter().zip(stars) {
//         println!("{} has {} stars", repo, star);
//     }
//
//     Ok(())
// }
