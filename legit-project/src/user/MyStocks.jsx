import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'

function MyStocks() {

    const API_URL = 'http://localhost:8000'    // URL de la API
    
    const [userStocks, setUserStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    const userId = 1

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        axios.get(`${API_URL}/users/${userId}/stocks`) 
          .then((response) => {
            setUserStocks(response.data);
            console.log(response.data, "user information")
            setMsg("Información de stocks obtenida correctamente");
          })
          .catch((error) => {
            setMsg(`Error al obtener información de stocks de usuario ${error}`)
          });
    
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