export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  google_id: string;
  role: string;
  name: string;
};

export interface Article {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  body: string;
  public: boolean;
  user_id: string;
  user: User;
  article_game_content: ArticleGameContent;
  article_owners: ArticleOwner[];
  article_tags: ArticleTag[];
  article_comments: ArticleComment[];
  article_image_urls: ArticleImageUrl[];
};

export interface ArticleGameContent {
  id: string;
  created_at: string;
  updated_at: string;
  exec_path: string;
  zip_url: string;
};

export interface ArticleOwner {
  id: string;
  article_id: string;
  user: User;
};

export interface ArticleTag {
  id: string;
  name: string;
};

export interface ArticleComment {
  id: string;
  created_at: string;
  updated_at: string;
  body: string;
  rate: number;
};

export interface ArticleImageUrl {
  id: string;
  image_url: string;
};
