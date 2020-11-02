import React, {useState} from 'react'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {useHistory} from "react-router-dom"


const useStyles = makeStyles((theme)=>({
    
}))

export default function Login(){
    //Material UI
    const classes = useStyles()
    //Hooks
    const [loginForm, setLoginForm] = useState({email: '', password: ''});

    //Movidas
    const onChangeInput = (event) => {
        setLoginForm({...loginForm, [event.target.name] : event.target.value });
    }

    let history = useHistory()

    const login = (event) => {
        event.preventDefault()
        console.log(loginForm)
        fetch("https://eco-mtk.herokuapp.com/api/v1/users/login", {
            method: "POST",
            body: JSON.stringify(loginForm),
            headers: { "Content-type": "application/json" }
        })
        // fetch("https://eco-mtk.herokuapp.com/api/v1/users/")
        .then(res => res.json())
        .then(data => {
            if(data.message){
                history.push('/dashboard')
            }
        })
        .catch(err => console.log(err))
    }


    return (
        <Box 
            bgcolor='primary.main'
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='80vh'
        >
            <form onInput={onChangeInput} onSubmit={login}>
                <Box 
                    bgcolor='white'
                    display= 'flex'
                    flexDirection= 'column'
                    padding= '20px'
                    color= 'primary.dark'
                    borderRadius= '5px'
                >
                    <h3>INICIA SESIÓN</h3>

                    <TextField
                        label="Email"
                        id="email"
                        name="email"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        required
                    />

                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size='small'
                        margin="normal"
                        required
                    />

                    <Button variant="contained" color="primary" type="submit">
                        Iniciar Sesión
                    </Button>
                    
                </Box>
            </form>
        </Box>
    )
}