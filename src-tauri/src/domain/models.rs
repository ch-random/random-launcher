// use chrono::{offset::FixedOffset, DateTime};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct User {
    id: String,
    // created_at: DateTime<FixedOffset>,
    // updated_at: DateTime<FixedOffset>,
    created_at: String,
    updated_at: String,
    google_id: String,
    role: String,
    name: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Article {
    pub id: String,
    // created_at: DateTime<FixedOffset>,
    // updated_at: DateTime<FixedOffset>,
    created_at: String,
    updated_at: String,
    title: String,
    body: String,
    public: bool,
    user_id: String,
    user: User,
    pub article_game_content: ArticleGameContent,
    article_owners: Vec<ArticleOwner>,
    article_tags: Vec<ArticleTag>,
    article_comments: Vec<ArticleComment>,
    article_image_urls: Vec<ArticleImageUrl>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArticleGameContent {
    id: String,
    // created_at: DateTime<FixedOffset>,
    // updated_at: DateTime<FixedOffset>,
    created_at: String,
    updated_at: String,
    exec_path: String,
    pub zip_url: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArticleOwner {
    id: String,
    article_id: String,
    user: User,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArticleTag {
    name: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArticleComment {
    // created_at: DateTime<FixedOffset>,
    // updated_at: DateTime<FixedOffset>,
    created_at: String,
    updated_at: String,
    body: String,
    rate: i32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArticleImageUrl {
    image_url: String,
}

// reduced models
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ReducedUser {
    id: String,
    google_id: String,
    role: String,
    name: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ReducedArticle {
    pub id: Option<String>,
    title: String,
    body: String,
    public: bool,
    user: User,
    pub article_game_content: ReducedArticleGameContent,
    article_owners: Vec<ArticleOwner>,
    article_tags: Vec<ArticleTag>,
    article_comments: Vec<ReducedArticleComment>,
    article_image_urls: Vec<ArticleImageUrl>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ReducedArticleGameContent {
    id: String,
    exec_path: String,
    pub zip_url: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ReducedArticleComment {
    body: String,
    rate: i32,
}
