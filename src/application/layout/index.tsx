import { FunctionalComponent, VNode } from "preact";

import styles from "./styles.module.css";

type Props = { navigationSlot?: VNode };

export const Layout: FunctionalComponent<Props> = ({
  navigationSlot,
  children,
}) => (
  <>
    <div className={styles.background}>
      <header className={styles.header}>
        <div className={styles.title}>SaberTooth</div>
        <div>{navigationSlot}</div>
      </header>
    </div>
    <main className={"padding-wrapper"}>{children}</main>
  </>
);
