import React, {useState, useEffect} from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Redirect, Link } from "react-router-dom"
import {useCookies} from "react-cookie"
import {makeStyles} from '@material-ui/core/styles';
const jwt = require('jsonwebtoken')

//MATERIAL UI
const useStyles = makeStyles((theme) => ({
    Button:{
        textDecoration: 'none',
        marginRight: '5px'
    },
    title: {
        flexGrow: 1
    },
    h:{
        margin:0,
    },
    link:{
        textDecoration: 'none',
        color: 'inherit'
    },
    bgimagen: {
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTjZ_YIT3Z_bjVZnbOx8DDYH1IcJU8srXjA&usqp=CAU")',
    }
}));

export default function Login(){
    //Material UI
    const classes = useStyles()

    //Hooks
    const [loginForm, setLoginForm] = useState({email: '', password: ''});
    const [cookies, setCookie] = useCookies(['token']);
    const [isSuper, setIsSuper] = useState({superuser:null})
    
    //Funciones
    const onChangeInput = (event) => {
        setLoginForm({...loginForm, [event.target.name] : event.target.value });
    }
    const setToken = (token) => {
        setCookie('token', token, {path:'/'})
    }
    const auth = (token) => {
        try {
            let access = jwt.verify(token, 'motk')
            if(access.user_id){
                fetch("http://localhost:8000/users/"+access.user_id+"/")
                .then(data=>data.json())
                .then(user=>{
                    setIsSuper({superuser:user.is_superuser})
                })
                .catch(error=>console.log(error))
            }
            
        } catch (error) {
            console.log("No has iniciado sesión: ",error.message)
        }
        
    }
    const login = (event) => {
        event.preventDefault()
        fetch("http://localhost:8000/api/token/", {
            method: "POST",
            body: JSON.stringify(loginForm),
            headers: { "Content-type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            let access = jwt.verify(data.access,'motk')
            if (access.user_id){
                setToken(data.access)
            }
        })
        .then(setTimeout(()=>{window.location.reload()},3000))
        .catch(err => console.log(err.message))
    }
    //Redirecciona a (admin o dashboard) si hay un token verificado en las cookies
    const permission = (issup) => {

        switch (issup) {
            case null:
                return <Redirect to={"/Login"}/>
            case true:
                return <Redirect to={"/Admin"}/>
            case false:
                return <Redirect to={"/Dashboard"}/>
            default:
                return <Redirect to={"/"}/>
        }
    }

    useEffect(()=>{
        auth(cookies.token)
    })

    return (
        <Box
        bgcolor='primary.main'
        height='100vh'
        >
            {permission(isSuper.superuser)}
            <Box 
            p={2} 
            display='flex'
            justifyContent='flex-end'
            bgcolor='primary.dark'
            >
                <Button 
                variant='outlined' 
                size='small'
                className={classes.Button}
                color='primary'
                >
                    <Link className={classes.link} to="/">Home</Link>
                </Button>
            </Box>

            <Box 
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='80vh'
            >

            <form onInput={onChangeInput} onSubmit={login} >
                <Box 
                    bgcolor='white'
                    display= 'flex'
                    flexDirection= 'column'
                    padding= '20px'
                    color= 'primary.dark'
                    borderRadius= '5px'
                >
                    <Box
                    height='80px'
                    >
                        <h2 className={classes.h}>Inicia Sesión</h2>
                        <small>¡Que bueno verte por aquí!</small>
                    </Box>

                    <TextField
                        label="username"
                        id="username"
                        name="username"
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

                    <Button  variant="contained" color="primary" type="submit">
                        Iniciar Sesión
                    </Button>
                    
                </Box>
            </form>
        </Box>
        </Box>
    )
}