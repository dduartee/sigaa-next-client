import { useTheme } from "next-themes";
const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  let themeName;
  const changeTheme = (evt: any) => {
    setTheme(evt.value);
    themeName = theme;
  };
  const optionsThemes = [
    { value: "light-green", label: "light-green" },
    { value: "dark-blue", label: "dark-blue" },
    { value: "dark-black", label: "dark-black" },
  ];
  return (
    <div className="input-field">
    <select>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
  </div>
  );
};

export { ThemeChanger };
