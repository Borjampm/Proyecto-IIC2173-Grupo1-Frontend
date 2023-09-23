import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

function MyStocks() {

    const API_URL = 'http://localhost:8000'    // URL de la API
    const { user, isAuthenticated } = useAuth0();
    const [userStocks, setUserStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    // const userId =n 1

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        if (user) {
            console.log("hihihi")
            axios.get(`${API_URL}/transactions/${user.sub}`) 
            .then((response) => {
                setUserStocks(response.data.stocks_data);
                console.log(response.data, "user information")
                setMsg("Información de stocks obtenida correctamente");
            })
            .catch((error) => {
                console.log(error)
                setMsg(`Error al obtener información de stocks de usuario ${error}`)
            });
        }
    
      }, []);
    
 
    return (
        <>
            <h1>My Stocks</h1>
            { userStocks ? (userStocks.map(function(stock, i) {
                // const stock_info = getDateComponents(stock.datetime)
                            return(
                                <p>{stock.id}</p>
                            )
                        })) : (
                                <p>Loading stocks...</p>
                            )
                        }
        </>
    )

}

export default MyStocks