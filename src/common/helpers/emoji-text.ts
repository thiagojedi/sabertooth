export const emojiText = (text: string, emojis: Emoji[]) => {
  let formattedText = text;
  emojis.forEach((e) => {
    formattedText = formattedText.replace(
      `:${e.shortcode}:`,
      `<img src="${e.static_url}" alt="${e.shortcode}" class="emoji" />`,
    );
  });
  return formattedText;
};
