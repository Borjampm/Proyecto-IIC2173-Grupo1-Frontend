import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";

const Auctions = () => {
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(false);
  const serverUrl = API_URL;

  const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        callSecureApi();
    }, []);

  const callSecureApi = async () => {
    try {
        const token = await getAccessTokenSilently();
        const decodedToken = jwtDecode(token);
        if (decodedToken.permissions[0] === "admin") {
            console.log("admin")
            setAdmin(true)
        }
        console.log(decodedToken.permissions[0], "decodedToken")
    } catch (error) {
      setMessage(error.message);
    }
  };

  return(
    <>
        { admin ? (
        <>
        <h1>Portal de Subastas</h1>
        <p>Aquí encontraras todas las subastas.</p>
        </>
        )
        : (
        <>
        <h1>Error</h1>
        <p>No tienes acceso a esta ventana (No eres usuario administrador).</p>
        </>
        )}
    </>
  )
};

export default Auctions;
