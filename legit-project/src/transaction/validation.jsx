import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams } from "react-router-dom";

function Validation() {

    const { user, isAuthenticated } = useAuth0();
    const [searchParams, setSearchParams] = useSearchParams();
    const [buyStatus, setBuyStatus] = useState();
    const [msg, setMsg] = useState("");

    const handleBuy = async(e) => {
        console.log("token", searchParams.get("token_ws"))
        console.log("user", user.sub)
        axios.post(`${API_URL}/transactions/webpay-result`, {
            Username: user.sub,
            Token: searchParams.get("token_ws")
        }).then((response) => {
            console.log(response);
            setBuyStatus(response.data);
            setMsg("Added to db")
        }).catch((error) => {
            setMsg("Not added to DB")
        })    
    }
    // Token
    // Username

    // Ver si token es nulo para no hacer el post
    // Se hace e post, y segun eso sale compra exitosa o compra denegada
 
    return (
        <>

            {searchParams.get("token_ws") ? (
                <>
                    <p>Transacción realizada</p>
                    <button onClick={() => handleBuy()}>Confirmar estado</button>
                </>
            ) : (
                <p>Transacción anulada</p>
            )}

            {buyStatus ? (
                <>
                    <p>Compra exitosa</p>
                </>
            ) : (
                <p>Compra rechazada</p>
            )}
            
        </>
    )

}

export default Validation
