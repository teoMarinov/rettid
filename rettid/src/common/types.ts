export type User = {
  username: string;
  nickname: string;
  password: string;
  email: string;
  post_karma: number;
  comment_karma: number;
  profile_picture: null;
  is_admin: boolean;
  is_banned: boolean;
};

export type Post = {
  comments: number;
  content: string;
  created_at: string;
  created_by: string;
  likes: number;
  dislikes: number;
  id: number;
  sub_title: string;
  title: string;
};

export type Sub = {
  created_at: string;
  sub_ownder: string;
  title: string;
  display_name: string;
  icon: null;
  banner: null
};

export type SubRettidData = {
  bans: string[];
  followers: string[];
  mods: string[];
  posts: Post[];
  sub: Sub;
};
