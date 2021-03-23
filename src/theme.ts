//------------------------------------------------------------------------------
// Define material UI theme
// Documentation: 
// https://material-ui.com/customization/theming/#theme-configuration-variables
//------------------------------------------------------------------------------

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#227c9d"
    },
    secondary: {
      main: "#ffcb77"
    },
    error: {
      main: "#E63B2E"
    },
    warning: {
      main: "#FC8422"
    },
    info: {
      main: "#5E34AD"
    },
    success: {
      main: "#6CC66F"
    }
  }
});

export default theme;
