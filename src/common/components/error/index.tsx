export const ErrorLog = (props: { error: Error }) => (
  <pre>
    <code>{JSON.stringify(props.error, undefined, 1)}</code>
  </pre>
);
