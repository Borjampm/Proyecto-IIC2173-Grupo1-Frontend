import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';

function MyStocks() {
    const { user, isAuthenticated } = useAuth0();
    const [userStocks, setUserStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (user) {
            axios
                .get(`${API_URL}/transactions/${user.sub}`) 
                .then((response) => {
                    setUserStocks(response.data.stocks_data);
                    console.log(response.data.stocks_data, "user information")
                    setMsg("Información de stocks obtenida correctamente");
                })
                .catch((error) => {
                    console.log(error)
                    setMsg(`Error al obtener información de stocks de usuario ${error}`)
                });
        }
    }, [user]);

    const openExternalSite = (url) => {
        window.open(url, '_blank');
      };

    const handleRedirect = (url) => {
        openExternalSite(url);
      };
 
    return (
        <>
            <h1>My Stocks</h1>
            {
                userStocks ? (
                    userStocks.length > 0 ? (
                        userStocks.map(function (stock, i) {
                        console.log(stock);
                        const pdfUrl = `https://e1-arquisis.s3.amazonaws.com/pdf/pdf_${stock.Username}_${stock.TotalAmount}.pdf`
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
                )}
        </>
    )

}

export default MyStocks