export const getPostPath = (post: Status): string =>
  "/@" + post.account.acct + "/" + post.id;
