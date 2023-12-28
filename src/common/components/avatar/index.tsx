import { FunctionalComponent } from "preact";

import style from "./styles.module.css";

export const Avatar: FunctionalComponent<{
  name: string;
  url: string;
  className?: string;
}> = (props) => (
  <img
    className={[style.avatar, props.className].join(" ")}
    src={props.url}
    alt={props.name}
  />
);
