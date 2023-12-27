import { FunctionalComponent, VNode } from "preact";

import styles from "./styles.module.css";
import { Navigation } from "./navigation.tsx";

type Props = { startSlot?: VNode; endSlot?: VNode };

export const Layout: FunctionalComponent<Props> = ({ startSlot, children }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.avatar}>{startSlot}</div>
        <div className={styles.title}>SaberTooth</div>
        <div>
          <Navigation />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};
