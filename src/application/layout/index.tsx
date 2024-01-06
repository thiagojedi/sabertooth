import { FunctionalComponent, VNode } from "preact";
import { useEffect } from "preact/hooks";
import { useNavigate } from "react-router-dom";

import { useAppConfig } from "../hooks.ts";

import styles from "./styles.module.css";

type Props = { navigationSlot?: VNode };

export const Layout: FunctionalComponent<Props> = ({
  navigationSlot,
  children,
}) => {
  const navigate = useNavigate();
  const { config } = useAppConfig();
  useEffect(() => {
    if (!config?.server) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      <div className={styles.background}>
        <header className={styles.header}>
          <div className={styles.title}>SaberTooth</div>
          {navigationSlot}
        </header>
      </div>
      <main className={"padding-wrapper"}>{children}</main>
    </>
  );
};
