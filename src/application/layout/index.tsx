import { FunctionalComponent, VNode } from "preact";

import styles from "./styles.module.css";

type Props = { startSlot?: VNode; endSlot?: VNode };

export const Layout: FunctionalComponent<Props> = ({
  startSlot,
  endSlot,
  children,
}) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.avatar}>{startSlot}</div>
        <div className={styles.title}>SaberTooth</div>
        <div>{endSlot}</div>
      </header>
      <main>{children}</main>
    </>
  );
};
