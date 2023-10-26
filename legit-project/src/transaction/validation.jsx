import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams } from "react-router-dom";

function Validation() {

    const { user, isAuthenticated } = useAuth0();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleBuy = async(e) => {
        console.log("token", searchParams.get("token_ws"))
        console.log("user", user.sub)
        axios.post(`${API_URL}/webpay-result`, {
            Username: user.sub,
            Token: searchParams.get("token_ws")
        }).then((response) => {
            setMsg("Added to db")
        }).catch((error) => {
            setMsg("Not added to DB")
        })    
    }
    // Token
    // Username
 
    return (
        <>
            <p>Compra realizada</p>
            <button onClick={() => handleBuy()}>POST</button>
        </>
    )

}

export default Validation
