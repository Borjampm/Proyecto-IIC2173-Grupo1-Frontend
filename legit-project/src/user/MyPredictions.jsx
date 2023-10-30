import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';

function MyPredictions() {
    const { user, isAuthenticated } = useAuth0();
    const [userPredictions, setUserPredictions] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (user) {
            axios
                .get(`${API_URL}/predictions/${user.sub}`) 
                .then((response) => {
                    setUserPrediction(response.data.predictions_data);
                    console.log(response.data.predictions_data, "user information")
                    setMsg("Información de predicciones obtenida correctamente");
                })
                .catch((error) => {
                    console.log(error)
                    setMsg(`Error al obtener información de predicciones de usuario ${error}`)
                });
        }
    }, [user]);
    
 
    return (
        <>
            <h1>My Predictions</h1>
            {
                userPredictions ? (
                    userPredictions.length > 0 ? (
                        userPredictions.map(function (prediction, i) {
                        console.log(prediction);
                        return (
                            <p key={i}>
                            Prediction ID: {prediction.id} | Finished: {stock.Completed ? 
                                <Link to={`/my-predictions/${prediction.id}`}>
                                    <button>Ver predicción</button>
                                </Link >
                                : "Espera un poco más"}
                            </p>
                        );
                        })
                    ) : (
                        <Link to="/companies">
                            <button>Buy your first stock</button>
                        </Link >
                    )
                ) : (
                    <p>Loading stocks...</p>
                )}
        </>
    )

}

export default MyPredictions