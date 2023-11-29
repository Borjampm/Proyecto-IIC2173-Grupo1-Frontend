import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';
import { AdminContext } from './AdminContext';

const PRICE = 100

function GroupStocks() {
    const { user, getIdTokenClaims, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [groupStocks, setGroupStocks] = useState(null);  // Variable que almacena los datos de la API para utilizarlo después
    const [msg, setMsg] = useState("");
    const [buymsg, setBuymsg] = useState("");
    const [apiResponse, setApiResponse] = useState(null)
    const { isAdmin } = useContext(AdminContext);
    const [tbkUrl, setTbkUrl] = useState("");
    const [tbkToken, setTbkToken] = useState("");
    const [stocksAdded, setStocksAdded] = useState(1);

    useEffect(() => {
        if (user) {
            axios
                .get(`${API_URL}/availablestocks/all`)
                .then((response) => {
                    setGroupStocks(response.data);
                    console.log(response.data)
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

    const handleFractionBuy = async(e, stock) => {
        e.preventDefault();
        const idToken = await getIdTokenClaims();
        const anotherToken = await getAccessTokenSilently();
        const tokenBearer = "Bearer " + anotherToken

        console.log("COMPRANDO USUARIO 0")

        axios
            .post(`${API_URL}/transactions/fraction/buy`, {
                Username: user.sub,
                Quantity: stocksAdded,
                Symbol: stock.company_symbol,
                IPAddres: user.custom_metadata.ip_adress,
                Price: stock.price
            },
            {
                headers: {
                Authorization: tokenBearer
                }
            })
            .then((response) => {
                console.log("tooken", response.data);
                setTbkToken(response.data.token);
                setTbkUrl(response.data.url);
                //TODO: esto solo debe redirecccionar si es que tenía plata
                setMsg("Compradas, ve el estado de tus compras aqui")
            })
            .catch((error) => {
                setBuymsg("Error al comprar stocks")
            })
    };

    function handleStocksAdded(e, max) {
        if (e >= 0.1 && e <= max) {
            setStocksAdded(e)
        } else {
            setStocksAdded(0.1)
        }
    }

    function less(e) {
        result = stocksAdded - 0.1
        if (result > 0) {
            setStocksAdded(result)
        }
    }

    const sum = (maxAmount) => {
        const result = stocksAdded + 0.1
        if (result <= maxAmount) {
            setStocksAdded(result)
        }
    }

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
                                Company: {stock.company_name} | Quantity: {stock.amount} | Fraction Price: {stock.price}
                                </p>
                                {isAdmin ? (
                                    <p>Ve tus stocks en tu perfil</p>
                                ) : (
                                    <>
                                        <form id="buy-stock" className="form" onSubmit={(e) => handleFractionBuy(e, stock)}>
                                            <div className="number-field">
                                                <label htmlFor="number">Select the FRACTION of stocks you want to buy</label>  
                                                <br></br>
                                                <>
                                                    <p onClick={less}>-</p>
                                                    <input 
                                                        type="number" 
                                                        name="number" 
                                                        id="number" 
                                                        value={stocksAdded} 
                                                        onChange={e => handleStocksAdded(e.target.value, stock.amount)} 
                                                        required 
                                                    />
                                                    <p  onClick={() => sum(stock.amount)}>+</p>
                                                </>
                                            </div>    
                                            <p>Total amount: ${Math.round(stocksAdded * PRICE)}</p>  
                                            <button type="submit" className="btn" >Solicitar stocks</button>  
                                        </form>
                                        {tbkToken ? (
                                            <form method="post" action={tbkUrl}>
                                                <input type="hidden" name="token_ws" value={tbkToken} />
                                                <button type="submit" value="Ir a pagar">Ir a pagar</button>
                                            </form>
                                        ):(<></>)}

                                        <p>{buymsg}</p>
                                    </>
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
