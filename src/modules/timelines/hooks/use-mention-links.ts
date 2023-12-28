import { useEffect, useRef } from "preact/hooks";

export const useMentionLinks = <T extends HTMLElement>(
  mentions: Mention[] = [],
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const anchors = ref.current?.querySelectorAll("a.mention");

    anchors?.forEach((anchor) => {
      const found = mentions.find(
        ({ username }) => "@" + username === anchor.textContent,
      );
      if (found) {
        anchor.setAttribute("href", "#/@" + found.acct);
        anchor.setAttribute("target", "_self");
      }
    });
  }, [mentions]);

  return ref;
};
