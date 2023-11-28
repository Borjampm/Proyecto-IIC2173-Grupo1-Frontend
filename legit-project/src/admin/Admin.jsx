import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";

const Admin = () => {
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
    <h1>Only for admins</h1>
        { admin ? ( <p>You are an admin</p>)
        : ( <p>you are not an admin</p>)}
    </>
  )
};

export default Admin;
