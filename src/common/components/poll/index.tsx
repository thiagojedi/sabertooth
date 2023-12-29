import { Fragment, FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { emojiText } from "../../helpers/emoji-text.ts";

const OPTION_NAME = "answer";

type Props = {
  poll: Poll;
  onVote?: (selection: string[]) => void;
};

export const PollOptions: FunctionalComponent<Props> = ({
  onVote = () => {},
  poll: {
    own_votes,
    expired,
    multiple,
    options,
    voted,
    votes_count: total,
    emojis,
  },
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      if (form) {
        onVote(new FormData(form).getAll(OPTION_NAME) as string[]);
      }
    };

    form?.addEventListener("submit", handleSubmit);
    return () => {
      form?.removeEventListener("submit", handleSubmit);
    };
  }, [onVote]);

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {expired || voted ? (
          options.map(({ title, votes_count }, index) => {
            const number = ((100 * votes_count) / total)
              .toFixed(1)
              .padStart(5, " ");
            return (
              <Fragment key={index}>
                <li
                  style={{
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {number.padStart(5, "0")}% {emojiText(title, emojis)}{" "}
                  {own_votes.includes(index) && "<-"}
                </li>
                <hr
                  style={{
                    width: number + "%",
                    margin: 0,
                    transition: "width 1s ease-in",
                  }}
                />
              </Fragment>
            );
          })
        ) : (
          <form ref={formRef}>
            {options.map(({ title }, index) => (
              <div key={index}>
                <input
                  type={multiple ? "checkbox" : "radio"}
                  id={title}
                  name={OPTION_NAME}
                  value={index}
                />
                <label htmlFor={title}>{title}</label>
              </div>
            ))}
            <input type="submit" value="Vote!" />
          </form>
        )}
      </ul>
      {expired && <small>poll ended</small>}
    </>
  );
};
