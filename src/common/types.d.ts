type Status = {
  id: string;
  created_at: string;
  in_reply_to_id: null;
  in_reply_to_account_id: null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  content: string;
  reblog: Status | null;
  application: {
    name: string;
    website: null;
  };
  account: Account;
  media_attachments: MediaAttachment[];
  mentions: Mention[];
  tags: [];
  emojis: Emoji[];
  card: Card;
  poll: null | Poll;
};

type Account = {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: true;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string;
  emojis: Emoji[];
  fields: [
    {
      name: string;
      value: string;
      verified_at: null;
    },
  ];
};

type Card = {
  url: string;
  title: string;
  description: string;
  type: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  html: string;
  width: number;
  height: number;
  image: null;
  embed_url: string;
};

type MediaAttachment = {
  id: string;
  url: string;
  preview_url: string;
  remote_url: string | null;
  text_url: string;
  description: string | null;
  blurhash: string | null;
} & (
  | {
      type: "image";
      meta: {
        original: {
          width: number;
          height: number;
          size: string;
          aspect: number;
        };
        small: {
          width: number;
          height: number;
          size: string;
          aspect: number;
        };
        focus: {
          x: number;
          y: number;
        };
      };
    }
  | {
      type: "video";
      meta: {
        length: string;
        duration: number;
        fps: number;
        size: string;
        width: number;
        height: number;
        aspect: number;
        audio_encode: string;
        audio_bitrate: string;
        audio_channels: string;
        original: {
          width: number;
          height: number;
          frame_rate: string;
          duration: number;
          bitrate: number;
        };
        small: {
          width: number;
          height: number;
          size: string;
          aspect: number;
        };
      };
    }
  | {
      type: "audio";
      meta: {
        length: string;
        duration: number;
        audio_encode: string;
        audio_bitrate: string;
        audio_channels: string;
        original: {
          duration: number;
          bitrate: number;
        };
      };
    }
  | {
      type: "gifv";
      meta: {
        length: string;
        duration: number;
        fps: number;
        size: string;
        width: number;
        height: number;
        aspect: number;
        original: {
          width: number;
          height: number;
          frame_rate: string;
          duration: number;
          bitrate: number;
        };
        small: {
          width: number;
          height: number;
          size: string;
          aspect: number;
        };
      };
    }
);

type Emoji = {
  shortcode: string;
  url: string;
  static_url: string;
};

type Mention = {
  acct: string;
  id: string;
  url: string;
  username: string;
};

type Poll = {
  id: string;
  expires_at: string;
  expired: boolean;
  multiple: boolean;
  votes_count: number;
  voters_count: null | number;
  voted: boolean;
  own_votes: number[];
  options: Array<{ title: string; votes_count: number }>;
  emojis: Emoji[];
};

type Context = {
  ancestors: Status[];
  descendants: Status[];
};
