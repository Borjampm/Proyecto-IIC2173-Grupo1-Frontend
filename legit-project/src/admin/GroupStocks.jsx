import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';

function GroupStocks() {
    const { user, isAuthenticated } = useAuth0();
    const [groupStocks, setGroupStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (user) {
            axios
                .get(`${API_URL}/availablestocks/all`)
                .then((response) => {
                    setGroupStocks(response);
                    console.log(response)
                    setMsg("Información de stocks obtenida correctamente");
                })
                .catch((error) => {
                    console.log(error)
                    setMsg(`Error al obtener información de stocks de usuario ${error}`)
                });
        }
    }, [user]);

    return (
        <>
            <h1>Stocks Of Group 1</h1>
            {/* {
                groupStocks ? (
                    groupStocks.length > 0 ? (
                        groupStocks.map(function (stock, i) {
                        // console.log(stock);
                        const pdfUrl = `https://e1-arquisis.s3.amazonaws.com/pdf/pdf_${stock.UserId}_${stock.Date}.pdf`
                        return (
                            <>
                                <p key={i}>
                                Company: {stock.CompanyId} | Quantity: {stock.Quantity} | Price: {stock.Price} | Completed: {stock.Completed ? "true" : "false"}
                                </p>
                                <button onClick={() => handleRedirect(pdfUrl)}>Abrir PDF</button>
                            </>
                        );
                        })
                    ) : (
                        <Link to="/companies">
                            <button>Buy your first stock</button>
                        </Link >
                    )
                ) : (
                    <p>Loading stocks...</p>
                )} */}
        </>
    )

}

export default GroupStocks
