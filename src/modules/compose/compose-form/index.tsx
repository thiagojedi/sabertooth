import { FunctionalComponent, VNode } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import { getFetcher } from "../../../common/helpers/request.ts";

import styles from "./styles.module.css";

const fetch = getFetcher()!;

type Props = {
  initialData: { cw?: string; text?: string };
  onSubmit?: () => void;
  additionalInputs?: VNode;
};

export const ComposeForm: FunctionalComponent<Props> = ({
  additionalInputs,
  initialData,
  onSubmit = () => {},
}) => {
  const [cw, setCw] = useState(initialData.cw);
  const [body, setBody] = useState(initialData.text);
  useEffect(() => {
    setCw(initialData.cw);
    setBody(initialData.text);
  }, [initialData]);

  const handleSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      fetch("/api/v1/statuses", "POST", formData).then(() => onSubmit());
    },
    [onSubmit],
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="spoiler_text">
        <small>Content Warning:</small>
      </label>
      <input
        type="text"
        id="spoiler_text"
        name="spoiler_text"
        value={cw}
        onChange={(e) => setCw(e.currentTarget.value)}
        placeholder={"optional"}
      />

      <label htmlFor="status">
        <small>Post Content:</small>
      </label>
      <textarea
        className={styles.body}
        id="status"
        name="status"
        value={body}
        onChange={(e) => setBody(e.currentTarget.value)}
        required
      />

      <div className={styles.footer}>
        <select name="visibility">
          <option value="public" default>
            Public
          </option>
          <option value="unlisted">Unlisted</option>
          <option value="private">Followers</option>
          <option value="direct">Only Mentioned</option>
        </select>
        &nbsp;
        <input type="submit" value="Toot!" />
      </div>

      {additionalInputs}
    </form>
  );
};
