import { FlexBody, FlexColumn, FlexContent } from "@components/home/Flex";
import { Navbar, NavbarItem } from "@components/home/Navbar";
import { ThemeChanger } from "@components/ThemeChanger";

export default function theme() {
  return (
    
    <FlexBody style={{ justifyContent: "flex-start" }}>
      <FlexColumn>
        <Navbar>
          <NavbarItem />
          <NavbarItem style={{ textAlign: "center" }}>
            <div className="navbarItem" style={{ textAlign: "center" }}>
              <div className="input-field">
                <span className="material-icons dark dark md-light prefix">
                  search
                </span>
                <input type="text" name="pesquisa" placeholder=" Pesquisar " />
              </div>
            </div>
          </NavbarItem>
          <NavbarItem>
            <ThemeChanger />
          </NavbarItem>
        </Navbar>
      </FlexColumn>
    </FlexBody>
  );
}
