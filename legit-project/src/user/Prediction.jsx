import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

function Prediction() {
    const { user, isAuthenticated } = useAuth0();
    const [msg, setMsg] = useState("")
    const { predictionId } = useParams();
    const [prediction, setPrediction] = useState(null)
    const [linearFunction, setLinearFunction] = useState(null)
    const [data, setData] = useState(null)
    const [options, setOptions] = useState(null)

    useEffect(() => {
        if (user) {
            axios
                .get(`${API_URL}/predictions/${predictionId}`) 
                .then((response) => {
                    setPrediction(response.data.prediction_data);
                    setLinearFunction(response.data.prediction_data.function);
                    console.log(response.data.prediction_data, "prediction data")

                })
                .catch((error) => {
                    console.log(error)
                    setMsg(`Error al obtener información de predicciones de usuario ${error}`)
                });
        }
    }, [user, predictionId]);

    useEffect(() => {
        const dataPoints = [];
        for (let x = -10; x <= 10; x++) {
          dataPoints.push({ x, y: linearFunction(x) });
        }

        setData({
            labels: dataPoints.map((point) => point.x),
            datasets: [
              {
                label: 'Linear Function',
                data: dataPoints.map((point) => point.y),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
              },
            ],
          }
        )
        setOptions({
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
              },
              y: {
                min: -10,
                max: 30,
              },
            },
          })
      

    }, [linearFunction])
    
 
    return (
        <>
            <h1>My Predictions</h1>
            <p>Value: {prediction.valor} </p>
            <Line data={data} options={options} />
        </>
    )

}

export default Prediction