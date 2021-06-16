import { Props } from "@types";
import { NextPage } from "next";
import styles from "@styles/page/page.module.css";

const Menu: NextPage<Props> = ({ children }) => {
  return <div className={styles.flexMenu}>{children}</div>;
};

const MenuItem: NextPage<Props> = ({ children }) => {
  return <div className={styles.menuItem}>{children}</div>;
};
export { Menu, MenuItem };
