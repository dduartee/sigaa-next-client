import styles from "@styles/page/page.module.css";
import { Props } from "@types";
import { NextPage } from "next";
const Navbar: NextPage<Props> = ({children}) => {
    return <div className={styles.flexNavbar}>{children}</div>
};
const NavbarItem: NextPage<Props> = ({ children, style}) => {
    return <div className={styles.navbarItem} style={style}>{children}</div>
}
export { Navbar, NavbarItem };
