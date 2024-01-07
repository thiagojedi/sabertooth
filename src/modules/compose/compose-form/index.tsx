import { FunctionalComponent, VNode } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import { getFetcher } from "../../../common/helpers/request.ts";
import { useServerPreferences } from "../../../application/hooks.ts";

import styles from "./styles.module.css";

const fetch = getFetcher()!;

type Props = {
  initialData: Partial<{ cw: string; text: string; visibility: string }>;
  onSubmit?: () => void;
  additionalInputs?: VNode;
};

const visibilityOptions: Record<Visibility, string> = {
  public: "Public",
  unlisted: "Unlisted",
  private: "Followers Only",
  direct: "Mentioned Only",
};

export const ComposeForm: FunctionalComponent<Props> = ({
  additionalInputs,
  initialData,
  onSubmit = () => {},
}) => {
  const [cw, setCw] = useState(initialData.cw);
  const [body, setBody] = useState(initialData.text);
  const [visibility, setVisibility] = useState(initialData.visibility);
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

  const config = useServerPreferences();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="spoiler_text">Content Warning:</label>
      <input
        type="text"
        id="spoiler_text"
        name="spoiler_text"
        value={cw}
        onChange={(e) => setCw(e.currentTarget.value)}
        placeholder={"optional"}
      />

      <label htmlFor="status">Post Content:</label>
      <textarea
        className={styles.body}
        id="status"
        name="status"
        value={body}
        onChange={(e) => setBody(e.currentTarget.value)}
        required
        maxLength={config?.statuses.max_characters}
      />

      <div className={styles.footer}>
        <select
          name="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.currentTarget.value)}
        >
          {Object.entries(visibilityOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input type="submit" value="Toot!" />
      </div>

      {additionalInputs}
    </form>
  );
};
