import {createMuiTheme} from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'
const theme = createMuiTheme({

    palette:{
        primary: {
            main: amber[500],
            light: amber[300],
            dark: amber[800]
        }
    }

})

export default theme;