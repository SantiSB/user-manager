import { createTheme } from "@mui/material"
import { teal } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[800],
    },
  },
})

export default theme
