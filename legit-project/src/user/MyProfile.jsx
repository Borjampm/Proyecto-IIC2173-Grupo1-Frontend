import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './MyProfile.css'
import axios from 'axios'
import AuthButton from "./AuthButton";
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';
import { jwtDecode } from "jwt-decode";


function MyProfile() {
    const { user, isAuthenticated } = useAuth0();
    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error
    const [moneyAdded, setMoneyAdded] = useState(0);
    const [user2, setUser2] = useState(null)
    const [userInformation, setUserInformation] = useState(null)
    const [admin, setAdmin] = useState(false);   // Variable que almacena los datos de la API para utilizarlo después

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

    const handleRegistration = async(e) => {
        axios.post(`${API_URL}/users/signup`, {
            Username: user.sub,
            Mail: user.email,
            Wallet: 0
        }).then((response) => {
            setMsg("Money added correctly")
        }).catch((error) => {
            setMsg("Error adding money")
        })
    }

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        if (user) {
        axios.get(`${API_URL}/users/${user.sub}`)
          .then((response) => {
            setUserInformation(response.data);
            setUser2(response.data.stocks_data)
            setMsg("Información de usuario obtenida correctamente");
          })
          .catch((error) => {
            setMsg(`Error al obtener información de usuario${error}`)
          });
        }
      }, [user]);

    const handleMoneyAmount = (p) => {     // Revisa que la contraseña tenga al menos 8 caracteres
        if (p >= 0) {
            if (user) {
                console.log(user)
                console.log("QUE CHICHA")
                const moneyBalance = p;
                console.log(moneyBalance, "useeEEr")
            }
            setMoneyAdded(p)
        } else {
            setMoneyAdded(0)
        }
    }

    const handleMoney = async(e) => {      // Envía los datos al backend para hacer efectivo el registro
        console.log("user")
        axios.post(`${API_URL}/users/addfunds`, {
            Username: user.sub,
            Funds: moneyAdded
        }).then((response) => {
            setMsg("Money added correctly")
        }).catch((error) => {
            console.log(error)
            setMsg("Error adding money")
        })
    }

    return (
        <>
            <div className="user-container">
                        { user ? (
                            <div className="user-information">
                                <h1 className="welcome">Welcome</h1>
                                <h1 className="welcome-email">{user.email}</h1>
                                { user2 ? (
                                    <>
                                    <Link to="/my-stocks">
                                        <button className="btn">See my stocks
                                        </button>
                                    </Link>
                                    <Link to="/my-predictions">
                                        <button className="btn">See my predictions
                                        </button>
                                    </Link>
                                    { admin ? (
                                        <>
                                    <Link to="/admin/offers">
                                        <button className="btn">See offered auctions
                                        </button>
                                    </Link>
                                    <Link to="/admin/my-proposals">
                                        <button className="btn">See my proposals
                                        </button>
                                    </Link>
                                    <Link to="/admin/auctions">
                                        <button className="btn">See proposals waiting action
                                        </button>
                                    </Link>
                                    <Link to="/admin/my-offers">
                                        <button className="btn">See my offers
                                        </button>
                                    </Link>
                                    </>
                                    ) : (<></>)}
                                    <p>Money: ${user2.Wallet}</p>
                                    </>
                                ) : (
                                    <>
                                     <Link to="/">
                                        <button onClick={() => handleRegistration()} type="submit">Complete you registration</button>
                                    </Link >

                                    </>
                                    )
                                }
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Add the amount of money you want</p>
                                        <input type="number" name="money" id="money" value={moneyAdded} onChange={m => handleMoneyAmount(m.target.value)} required />
                                    <br/>
                                    <br/>
                                    <button onClick={() => handleMoney()}>Add to money</button>
                            </div>
                           ) : (
                                <p>Loading user information...</p>
                            )
                        }
                </div>
        </>
    )
}

export default MyProfile
