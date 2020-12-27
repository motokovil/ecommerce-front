import {createMuiTheme} from '@material-ui/core/styles'
import lime from '@material-ui/core/colors/lime'
const theme = createMuiTheme({

    palette:{
        primary: {
            main: lime[500],
            light: lime[300],
            ld: lime[750],
            dark: lime[800]
        }
    }

})

export default theme;