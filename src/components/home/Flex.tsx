import { NextPage } from "next";
import styles from "@styles/page/page.module.css";
import { Props } from "@types";

const FlexBody: NextPage<Props> = ({ children }) => {
  return <div className={styles.flexBody}>{children}</div>;
};
const FlexColumn: NextPage<Props> = ({ children }) => {
  return <div className={styles.flexColumn}>{children}</div>;
};
const FlexRow: NextPage<Props> = ({ children }) => {
  return <div className={styles.flexRow}>{children}</div>;
};
const FlexContent: NextPage<Props> = ({ children }) => {
  return <div className={styles.flexContent}>{children}</div>;
};
export { FlexBody, FlexColumn, FlexRow, FlexContent };
