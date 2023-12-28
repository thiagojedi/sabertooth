import { FunctionComponent } from "preact";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../avatar";

import style from "./styles.module.css";

export const PostHeader: FunctionComponent<{
  url: string;
  name: string;
  handle: string;
}> = (props) => {
  const navigate = useNavigate();
  return (
    <header
      className={style.header}
      onClick={() => navigate("/@" + props.handle)}
    >
      <Avatar className={style.avatar} url={props.url} name={props.name} />

      <span
        className={style.name}
        dangerouslySetInnerHTML={{ __html: props.name }}
      />
      <small className={style.handle}>@{props.handle}</small>
    </header>
  );
};
