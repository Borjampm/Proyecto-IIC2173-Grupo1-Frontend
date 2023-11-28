import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';
import { AdminContext } from './AdminContext';

const PRICE = 100

function GroupStocks() {
    const { user, isAuthenticated } = useAuth0();
    const [groupStocks, setGroupStocks] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    const [msg, setMsg] = useState("")
    const { isAdmin } = useContext(AdminContext);

    useEffect(() => {
        if (user) {
            axios
                .get(`${API_URL}/availablestocks/all`)
                .then((response) => {
                    setGroupStocks(response.data);
                    setMsg("Información de stocks obtenida correctamente");
                })
                .catch((error) => {
                    console.log(error)
                    setMsg(`Error al obtener información de stocks`)
                });
        } else {
            setMsg("Necesitas conectarte para poder ver los stocks disponibles")
        }
    }, [user]);

    const handleFractionBuy = () => {
        console.log("COMPRANDO")
      };

    return (
        <>
            <h1>Stocks Of Group 1</h1>
            {
                groupStocks ? (
                    groupStocks.length > 0 ? (
                        groupStocks.map(function (stock, i) {
                        return (
                            <>
                                <p key={i}>
                                Company: {stock.stock_id} | Quantity: {stock.amount} | Price: {PRICE}
                                </p>
                                {isAdmin ? (
                                    <p>Ve tus stocks en tu perfil</p>
                                ) : (
                                    <button onClick={() => handleFractionBuy()}>Solicitar Fracciones</button>
                                )}
                                
                            </>
                        );
                        })
                    ) : (
                        <Link to="/companies">
                            <button>Buy your first stock</button>
                        </Link >
                    )
                ) : (
                    <p>Loading stocks... {msg}</p>
                )}
        </>
    )

}

export default GroupStocks
