import { FunctionComponent } from "preact";

import style from "./styles.module.css";
import { Avatar } from "../avatar";

export const PostHeader: FunctionComponent<{
  url: string;
  name: string;
  handle: string;
}> = (props) => {
  return (
    <header className={style.header}>
      <Avatar className={style.avatar} url={props.url} name={props.name} />

      <span className={style.name}>{props.name}</span>
      <small className={style.handle}>@{props.handle}</small>
    </header>
  );
};
