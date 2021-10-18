import { Link, LinkProps } from "react-router-dom";

export default function CustomLink(
  props: LinkProps & React.RefAttributes<HTMLAnchorElement>
) {
  return <Link style={{ textDecoration: "none" }} {...props}></Link>;
}
