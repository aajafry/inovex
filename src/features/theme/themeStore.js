/* eslint-disable react-hooks/rules-of-hooks */
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function themeStore() {
  const primaryColor = useSelector((state) => state.theme.praimaryColor);
  const secondaryColor = useSelector((state) => state.theme.secondaryColor);
  const textColor = useSelector((state) => state.theme.textColor);

  const theme = createTheme({
    palette: {
      primary: {
        main: `${primaryColor}`,
      },
      secondary: {
        main: `${secondaryColor}`,
      },
      info: {
        main: `${textColor}`,
      },
    },
    typography: {
      fontSize: 12,
    },
  });

  return theme;
}
