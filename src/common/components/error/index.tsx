import { FunctionalComponent } from "preact";

export const DebugLog: FunctionalComponent<{ info?: object }> = (props) => {
  if (!import.meta.env.VITE_LOGS) {
    return null;
  }
  return (
    <pre>
      <code>{JSON.stringify(props.info, undefined, 1)}</code>
    </pre>
  );
};
