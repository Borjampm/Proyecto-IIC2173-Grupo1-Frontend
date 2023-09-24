import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

function MyStocks() {

    const API_URL = 'http://localhost:8000'    // URL de la API
    const { user, isAuthenticated } = useAuth0();
    const [userStocks, setUserStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    const [msg, setMsg] = useState("")
    // const userId =n 1

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        if (user) {
            console.log("hihihi")
            axios.get(`${API_URL}/transactions/${user.sub}`) 
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
    
 
    return (
        <>
        <h1>My Stocks</h1>
        {userStocks ? (
        userStocks.length > 0 ? (
            userStocks.map(function (stock, i) {
            console.log(stock);
            return (
                <p key={i}>
                Company: {stock.CompanyId} | Quantity: {stock.Quantity} | Price: {stock.Price} | Completed: {stock.Completed ? "true" : "false"}
                </p>
            );
            })
        ) : (
            <Link to="/stocks">
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