import { useTheme } from "next-themes";
import Dropdown, {Option, Group} from "react-dropdown";
import "react-dropdown/style.css";
function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const changeTheme = (evt: any) => {
    setTheme(evt.value);
  };
  
  const optionsThemes: (string | Group | Option)[] = [
    {
      type: 'group',
      name: 'Dark', 
      items: [
        { value: "dark-blue", label: "Blue" },
        { value: "dark-black", label: "Black" },
      ]
    },
    {
      type: 'group',
      name: 'Light', 
      items: [
        { value: "light-green", label: "Green" },
      ]
    },
  ]
  return <Dropdown options={optionsThemes} onChange={changeTheme} placeholder={theme??"Escolha um tema"}/>;
}

export { ThemeChanger };
