import React, {useState, useEffect} from "react"
import {useCookies} from "react-cookie";

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		maxWidth: 200,
	},
});

const jwt = require('jsonwebtoken')

export default function Boletines(){

	const classes = useStyles();

	//Hooks
	const [, setIsSuper] = useState({superuser:null})
    const [cookies] = useCookies(['token']);
	const [, setUser] = useState({})
	const [ boletines, setboletines] = useState([])

	const auth = (token) => {
        try {
            let access = jwt.verify(token, 'motk')
            if(access.user_id){
                fetch("http://localhost:8000/users/"+access.user_id+"/")
                .then(data=>data.json())
                .then(user=>{
                    console.log("Logged in")
                    setIsSuper({superuser:user.is_superuser})
                    setUser(user)
                })
                .catch(error=>console.log(error))
            }
            
        } catch (error) {
            console.log("No has iniciado sesión: ", error.message)
        }
	}
	const getBoletines = () => {
		fetch("http://localhost:8000/boletines/", {
            method: "GET",
            headers: { 
				"Content-type": "application/json",
				"Authorization": "Bearer "+cookies.token,
			}
        })
		.then(res => res.json())
		.then(res=> setboletines(res))
		.catch(error=>console.log(error))
	}

	useEffect(()=>{
		auth(cookies.token)
		getBoletines()
	},[])


	
	return (
		<Grid container spacing={2}>
		{
			boletines.map(item => (

				<Grid item >
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
						component="img"
						alt="Contemplative Reptile"
						height="140"
						image={item.imagen}
						title="Biblioteca"
						/>
						<CardContent>
							<Typography gutterBottom variant="h6" component="h2">
								{item.nombre}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{item.descripcion}
							</Typography>
						</CardContent>
					</CardActionArea>

					<CardActions>
						<Button size="small" color="primary">
						Share
						</Button>
						<Button size="small" color="primary">
						Learn More
						</Button>
					</CardActions>
				</Card>
				</Grid>
			))
		}
		</Grid>
	)
}