import { Fragment, FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { emojiText } from "../../helpers/emoji-text.ts";

import styles from "./styles.module.css";

const OPTION_NAME = "choices[]";

type Props = {
  poll: Poll;
  onVote?: (selection: FormData) => void;
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
        onVote(new FormData(form));
      }
    };

    form?.addEventListener("submit", handleSubmit);
    return () => {
      form?.removeEventListener("submit", handleSubmit);
    };
  }, [onVote]);

  if (expired || voted) {
    return (
      <>
        <ul className={styles.resultList}>
          {options.map(({ title, votes_count }, index) => {
            const number = ((100 * votes_count) / total).toFixed(1);
            return (
              <Fragment key={index}>
                <li
                  className={styles.resultItem}
                  style={{
                    fontWeight: own_votes.includes(index) ? "bold" : "normal",
                  }}
                >
                  {number.padStart(5, "0")}%{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: emojiText(title, emojis),
                    }}
                  />
                </li>
                <hr
                  className={styles.resultProportion}
                  style={{ width: number + "%" }}
                />
              </Fragment>
            );
          })}
          {expired && (
            <footer>
              <small>poll ended</small>
            </footer>
          )}
        </ul>
      </>
    );
  }

  return (
    <form ref={formRef}>
      {options.map(({ title }, index) => (
        <div key={index}>
          <input
            type={multiple ? "checkbox" : "radio"}
            id={title}
            name={OPTION_NAME}
            value={index}
          />
          <label
            htmlFor={title}
            dangerouslySetInnerHTML={{ __html: emojiText(title, emojis) }}
          />
        </div>
      ))}
      <input type="submit" value="Vote!" />
    </form>
  );
};
