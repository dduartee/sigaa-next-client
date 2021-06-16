import { Props } from "@types";
import { NextPage } from "next";
import styles from "@styles/index/index.module.css";
const Card: NextPage<Props> = ({ children, style }) => {
  return <div className={styles.flexCard} style={style}>{children}</div>;
};
const CardInfo: NextPage<Props> = ({ children, style }) => {
  return <div className={styles.cardInfo} style={style}>{children}</div>;
};
const CardContent: NextPage<Props> = ({ children, style }) => {
  return <div className={styles.cardContent} style={style}>{children}</div>;
};
const CardBody: NextPage<Props> = ({ children, style }) => {
  return <div className={styles.cardBody} style={style}>{children}</div>;
};
const CardItem: NextPage<Props> = ({ children, style }) => {
  return <div className={styles.cardItem} style={style}>{children}</div>;
};

export { Card, CardBody, CardContent, CardInfo, CardItem };
