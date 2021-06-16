import { Props } from "@types";
import { NextPage } from "next";
//import styles from "@styles/home/page.module.css";
import styles from "@styles/home/home.module.css";

const ContentItem: NextPage<Props> = ({ children }) => {
  return <div className={styles.contentItem}>{children}</div>;
};
const ContentBody: NextPage<Props> = ({ children }) => {
  return <div className={styles.contentBody}>{children}</div>;
};
const ContentInfo: NextPage<Props> = ({ children }) => {
  return <div className={styles.contentInfo}>{children}</div>;
};
const InfoContainer: NextPage<Props> = ({ children }) => {
  return <div className={styles.infoContainer}>{children}</div>;
};
export { ContentBody, ContentItem, ContentInfo, InfoContainer };
