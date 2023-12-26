import { expect, test } from "vitest";
import { emojiText } from "./emoji-text";

const account = {
  display_name: "Text :shortcode: Final",
  emojis: [
    {
      shortcode: "shortcode",
      static_url: "https://example.com/emoji.png",
    },
  ],
};

test("should have replaced shortcode", () => {
  const text = emojiText(account.display_name, account.emojis);

  expect(text).toMatch("<img");
});
