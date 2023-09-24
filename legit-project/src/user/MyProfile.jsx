import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './MyProfile.css'
import axios from 'axios'
import AuthButton from "./AuthButton";
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config.js';


function MyProfile() {
    const { user, isAuthenticated } = useAuth0();

    // const [userInformation, setUserInformation] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error
    const [moneyAdded, setMoneyAdded] = useState(0); 
    const [user2, setUser2] = useState(null)
    // const companies = [                   // Este es el formato en el que se tienen que recuperar los datos de la API
    //     {"shortName": "Apple Inc.", "symbol": "AAPL"},
    //     {"shortName": "Microsoft Corporation", "symbol": "MSFT"},
    //     {"shortName": "Amazon.com, Inc.", "symbol": "AMZN"}
    // ]
    const [userInformation, setUserInformation] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después
    // if (isAuthenticated) {
    //     console.log(user, "user")
    //     setUserInformation(user)
    // }
    // const userId = 1
    // const userInformation = {
    //       "username": "jose",
    //       "password": "1234",
    //       "money": 10000
    //   }

    const handleMoney = async(e) => {
        console.log("signing up")
        axios.post(`${API_URL}/users/signup`, {
            Username: user.sub,
            Mail: user.email,
            Wallet: 0
        }).then((response) => {
            console.log(response)
            setMsg("Money added correctly")
        }).catch((error) => {
            console.log(error)
            setMsg("Error adding money")
        })
            
        // axios.post(`${API_URL}/users/add-money`, {
        //     userId: userId,
        //     amount: moneyAdded
        // }).then((response) => {
        //     setMsg("Money added correctly")
        // }).catch((error) => {
        //     setMsg("Error adding money")
        // })
    }

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        
        
        if (user) {
        axios.get(`${API_URL}/users/${user.sub}`) 
          .then((response) => {
            setUserInformation(response.data);
            console.log(response.data, "user information")
            setUser2(response.data.stocks_data)
            setMsg("Información de usuario obtenida correctamente");
          })
          .catch((error) => {
            console.log(error)
            setMsg(`Error al obtener información de usuario${error}`)
          });
        }


    
      }, [user]);

    const handleMoneyAmount = (p) => {     // Revisa que la contraseña tenga al menos 8 caracteres
        if (p >= 0) {
            if (user) {
                console.log(user, "useer")
                const moneyBalance = p;
                console.log(moneyBalance, "useeEEr")
            }
            setMoneyAdded(p)
        } else {
            setMoneyAdded(0)
        }
    }

    const handleDB = async(e) => {      // Envía los datos al backend para hacer efectivo el registro
        console.log("hiii")
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
                {/* <p>{ msg }</p> */}
                {/* <AuthButton /> */}
                {/* <h1>User {userId}</h1> */}
                        { user ? (
                            <div className="user-information">
                                <h1 className="welcome">Welcome</h1>
                                <h1 className="welcome-email">{user.email}</h1>
                                {/* <p>Username: {user.sub}</p> */}
                                {/* <p>Email: {user.email}</p> */}
                                {/* <p>Money: {userInformation.money}</p> */}
                                {/* <form id="register-form" className="form" onSubmit={handleMoney}> */}
                                { user2 ? (
                                    <>
                                    <Link to="/my-stocks">
                                        <button className="btn">See my stocks
                                        </button>
                                    </Link>
                                    <p>Money: ${user2.Wallet}</p>
                                    </>
                                ) : (
                                    <>                                   
                                     <Link to="/">
                                        <button onClick={() => handleMoney()} type="submit">Complete you registration</button>
                                    </Link >

                                    </>
                                    )


                                    
                                }   
                                {/* </form> */}
                                
                                {/* <form id="db" className="form" onSubmit={handleDB}>
                                    <div className="field">
                                        <label htmlFor="money">Amount</label> */}
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p>Add the amount of money you want</p>
                                        <input type="number" name="money" id="money" value={moneyAdded} onChange={m => handleMoneyAmount(m.target.value)} required />
                                    {/* </div> */}
                                    <br/>
                                    <br/>

            
                                    <button onClick={() => handleDB()}>Add to money</button>
                                {/* </form> */}

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