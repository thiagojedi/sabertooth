export const DebugLog = (props: { info?: object }) => (
  <pre>
    <code>{JSON.stringify(props.info, undefined, 1)}</code>
  </pre>
);
