import { expect, test } from "vitest";
import { emojiText } from "./emoji-text";

const account = {
  display_name: "bia :marxnoel:",
  emojis: [
    {
      shortcode: "marxnoel",
      url: "https://media.bolha.us/bolhaprod/cache/custom_emojis/images/000/151/911/original/f482ca7f7d936c18.png",
      static_url:
        "https://media.bolha.us/bolhaprod/cache/custom_emojis/images/000/151/911/static/f482ca7f7d936c18.png",
      visible_in_picker: true,
    },
  ],
};

test("should have replaced shortcode", () => {
  const text = emojiText(account.display_name, account.emojis);

  expect(text).toMatch("<img");
});
