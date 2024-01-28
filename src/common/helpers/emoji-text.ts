export const emojiText = (text: string, emojis: Emoji[]) => {
  let formattedText = text;
  emojis.forEach((e) => {
    formattedText = formattedText.replace(
      new RegExp(`:${e.shortcode}:`, "g"),
      `<img src="${e.static_url}" alt="${e.shortcode}" class="emoji" />`,
    );
  });
  return formattedText;
};
