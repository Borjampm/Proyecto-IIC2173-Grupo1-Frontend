import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
// import amazon from './../assets/logos/AMZN.png'

function AvailableStocks() {
    const [apiResponse, setApiResponse] = useState(null)

    const [msg, setMsg] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios
            .get(`${API_URL}/availablestocks/all`)
            .then((response) => {
                setApiResponse(response.data);
                setMsg("Stocks obtenidas correctamente");
                console.log(response.data)
            })
            .catch((error) => {
                setMsg(`Error al obtener las stocks ${error}`)
            });
        }, []
    );

    return (
        <div className="companies-v-container">
            { msg ? (
                <></>
            ): (
                <p>Error obteniendo las stocks, intenta más tarde.</p>
            )}
            <h1>Stocks</h1>

        </div>
    )

}

export default AvailableStocks
